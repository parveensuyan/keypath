<?php

namespace App\Http\Controllers;

use App\Models\QuestionAnswer;
use App\Models\QuestionModel;
use App\Models\CategoryModel;
use App\Models\OptionModel;
use App\Models\ResultModel;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    function index($cid = 0)
    {

        $category = CategoryModel::select('name', 'category_id')
            ->orderBy('category_id')
            ->where('category_id', '>', $cid)
            ->first();
        if (!$category)
            return response()->json([
                'message' => 'No category found.'
            ], 404);
        $nextCategory = CategoryModel::where('category_id', '>', $category['category_id'])->first();
        $question = QuestionModel::where('category_id', $category['category_id'])->get();
        foreach ($question as $key => $value) {
            $option = OptionModel::where('qtn_id', $value['qtn_id'])->get();
            $question[$key]['option'] = $option;

        }
        return response()->json([
            'questions' => $question,
            'category_id' => $category->category_id,
            'final_category' => $nextCategory == null,
        ]);
    }

   public function submit(Request $request)
    {
        $questions = $request->input('questions');
        $answers = QuestionAnswer::with('question')->get()->toArray();
        $questionPerCategory = array_reduce($answers, function ($result, $item) {
            $categoryId = $item['question']['category_id'];
            if (!isset($result[$categoryId])) {
                $result[$categoryId] = 0;
            }
            $result[$categoryId]++;
            return $result;
        }, []);
        $categoryIds = array_keys($questionPerCategory);
        $categories = CategoryModel::whereIn('category_id', $categoryIds)->get()->toArray();
        $scorePerCategory = [];
        foreach ($answers as $answer):
            $categoryId = $answer['question']['category_id'];
            $questionId = $answer['qtn_id'];
            $question = $answer['question'];
            if (!isset($scorePerCategory[$categoryId])) {
                $scorePerCategory[$categoryId] = 0;
            }
            $submittedQuestion = isset($questions[$questionId]) ? array_keys($questions[$questionId]) : [];
            if ($question["question_type"] == 'checkbox') {
                $tempAnswers = explode(',', $answer['option_id']);
                $diff = array_diff($submittedQuestion, $tempAnswers);
                if (count($submittedQuestion) == count($tempAnswers) && count($diff) == 0) {
                    $scorePerCategory[$categoryId]++;
                }
            } else {
                if (in_array($answer['option_id'], $submittedQuestion)) {
                    $scorePerCategory[$categoryId]++;
                }
            }
        endforeach;

        $percentageContainer = [];

        foreach ($questionPerCategory as $categoryId => $totalQuestions):
            $score = $scorePerCategory[$categoryId];
            $percentage = ceil($score / $totalQuestions * 100);
            $percentageContainer[$categoryId] = $percentage;
        endforeach;

        $result = array_reduce($categories, function ($result, $item) use ($percentageContainer) {
            $item['result'] = $percentageContainer[$item['category_id']] ?? 0;
            $result[] = $item;
            return $result;
        }, []);
        // $saveResult = new ResultModel;
        foreach($result as $value){
        ResultModel::insert(
	    ['category_id' =>  $value['category_id'], 'percentage' => $value['result']]
    	);
           
        }
      
        return response()->json(['result' => $result]);
    }

}

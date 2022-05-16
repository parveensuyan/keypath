<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\QuestionModel;
use App\Models\CategoryModel;
use App\Models\OptionModel;
use Illuminate\Support\Arr;

class QuestionController extends Controller
{
    function index($cid = 0){


        $category = CategoryModel::select('name','category_id')
                     ->orderBy('category_id','asc')
                     ->where('category_id','>',$cid)
                     ->first();

        $question =  $option = array();
        $question  = QuestionModel::where('category_id', $category['category_id'])->get();
            foreach ($question as $key => $value) {
            $option = OptionModel::where('qtn_id',$value['qtn_id'])->get();
            $question[$key]['option'] = $option;
            
            }
            echo $question;

    }
}

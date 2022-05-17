<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionAnswer extends Model
{
    use HasFactory;

    protected $table = "question_answer";

    public function question()
    {
        return $this->belongsTo(QuestionModel::class, 'qtn_id', 'qtn_id');
    }

}

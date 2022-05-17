<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionModel extends Model
{
    use HasFactory;
    protected $table = 'question';

    public function category()
    {
        return $this->hasOne(Categorymodel::class);
    }
    
}

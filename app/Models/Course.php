<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
    ];
    
    public function lessons()
    {
        return $this->hasMany(Lesson::class, 'course_id');
    }

    public function students()
    {
        return $this->belongsToMany(Student::class, 'course_has_student', 'course_id')->withTimeStamps();
    }
}

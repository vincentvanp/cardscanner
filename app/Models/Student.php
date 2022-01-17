<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'serial_number',
    ];

    protected $visible = [
        'name',
        'serial_number'
    ];

    public function lessons()
    {
        return $this->belongsToMany(Lesson::class, 'student_has_lesson', 'student_id')
                    ->withPivot('present')
                    ->withTimeStamps();
    }

    public function attendedLessons()
    {
        return $this->lessons()->wherePivot('present', 1);
    }

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'course_has_student', 'student_id')->withTimeStamps();
    }
    
}

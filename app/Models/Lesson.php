<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'name',
        'start',
        'end'
    ];

    protected $casts = [
        'start' => 'date:Y-m-d'
    ];

    protected $visible = [
        'id',
        'name',
        'course_id',
        'start'
    ];
    
    public function users(){
        return $this->belongsToMany(User::class, 'user_has_lesson', 'lesson_id')->withPivot('is_previous')->withTimeStamps();
    }
    

    public function students(){
        return $this->belongsToMany(Student::class, 'student_has_lesson', 'lesson_id')->withPivot('present')->withTimeStamps();
    }

    public function abscentStudents(){
        return $this->belongsToMany(Student::class, 'student_has_lesson', 'lesson_id')->wherePivot('present', 0)->withTimeStamps();
    }

    public function presentStudents(){
        return $this->belongsToMany(Student::class, 'student_has_lesson', 'lesson_id')->wherePivot('present', 1)->withTimeStamps();
    }

    public function lateStudents($start){
        return $this->belongsToMany(Student::class, 'student_has_lesson', 'lesson_id')
        ->wherePivot('present', 1)
        ->wherePivot('updated_at', '>', $start)
        ->withTimeStamps();
    }

    public function courses()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }

    
}

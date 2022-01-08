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
    
    public function users() 
    {
        return $this->belongsToMany(User::class, 'user_has_lesson', 'lesson_id');
    }

    public function getUsers() 
    {
        return $this->users()->withPivot('is_previous')->withTimeStamps();
    }
    

    public function students() 
    {
        return $this->belongsToMany(Student::class, 'student_has_lesson', 'lesson_id');
    }

    public function getStudents()
    {
        return $this->students()->withPivot('present')->withTimeStamps();
    }

    public function abscentStudents()
    {
        return $this->getStudents()->wherePivot('present', 0);
    }

    public function presentStudents() 
    {
        return $this->getStudents()->wherePivot('present', 1);
    }

    public function courses()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }

    
}

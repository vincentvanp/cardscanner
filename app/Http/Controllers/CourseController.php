<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\User;
use Auth;
use DB;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    //Function to retun all courses of the current user: returns an array with courseobjects
    public function getUserCourses()
    {
        $courses = DB::table('users')
                        ->where('users.id', '=', Auth::user()->id)
                        ->join('user_has_lesson', 'users.id', '=', 'user_has_lesson.user_id')
                        ->join('lessons', 'lessons.id','=','user_has_lesson.lesson_id')
                        ->join('courses','courses.id','=','lessons.course_id')
                        ->select('courses.id', 'courses.name')
                        ->distinct()
                        ->get();
        
        return $courses->toJson(); 
    }

    //Function that returns all courses
    public function getAllCourses()
    {
        $courses = Course::all();

        return $courses->toJson();
    }

}

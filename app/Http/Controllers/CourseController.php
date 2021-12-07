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
        $courses = Auth::user()
                        ->leftJoin('user_has_lesson', 'users.id', '=', 'user_has_lesson.user_id')
                        ->leftJoin('lessons', 'lessons.id','=','user_has_lesson.lesson_id')
                        ->leftJoin('courses','courses.id','=','lessons.course_id')
                        ->select('courses.name')
                        ->distinct()
                        ->get();
        
        return $courses->toJson();  
    }

}

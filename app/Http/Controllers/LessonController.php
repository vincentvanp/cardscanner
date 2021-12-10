<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\User;
use App\Models\Course;
use Auth;
use DB;
use Illuminate\Http\Request;


class LessonController extends Controller
{
    //Function to return all the previous lessons of the logged in user 
    public function getPreviousLessons() 
    {
        $user = Auth::user();
        $lessons = $user->previousLessons;

        return json_encode(array(
            'lessons' => $lessons,
            'user' => $user->makeHidden('name'),
        ));
    }

    //Function to return all the unstarted lessons of the logged in user 
    public function getUnstartedLessons()
    {
        $user = Auth::user();
        $lessons = $user->unstartedLessons;

        return json_encode(array(
            'lessons' => $lessons,
            'user' => $user->makeHidden('name'),
        ));
    }

    //Function that gives back lessons based on a given course id
    public function getLessonsByCourse(Request $request){
        $course = Course::where('id', $request['course_id'])->first();
        return $course->lessons->toJson();
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\User;
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
            'lessons' => $lessons->toJson(),
            'user' => $user->makeHidden('name')->toJson(),
        ));
    }

    //Function to return all the unstarted lessons of the logged in user 
    public function getUnstartedLessons()
    {
        $user = Auth::user();
        $lessons = $user->unstartedLessons;

        return json_encode(array(
            'lessons' => $lessons->toJson(),
            'user' => $user->makeHidden('name')->toJson(),
        ));
    }
}

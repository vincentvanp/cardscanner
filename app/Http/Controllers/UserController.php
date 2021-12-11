<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Lesson;
use Auth;

class UserController extends Controller
{
    public function startLesson(Request $request)
    {
        return "help";
        
        // $lesson = Lesson::where('id', $request["lesson_id"])->first();
        // $user = Auth::user();
        // return $lesson->users()->updateExistingPivot($user,['is_previous' => 1]);
    }

    public function UserHasLesson(){
        return "help";
    }
}

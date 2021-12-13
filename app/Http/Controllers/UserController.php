<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Lesson;
use Auth;

class UserController extends Controller
{
    // public function StartLesson(Request $request){

    //     return "hello";

    //     $lesson = Lesson::where('id', $request["lesson_id"])->first();
    //     $user = Auth::user();
    //     return $lesson->users()->updateExistingPivot($user,['is_previous' => 1]);
    // }
}

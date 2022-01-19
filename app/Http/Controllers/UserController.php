<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Lesson;
use Auth;
use Illuminate\Http\Request;

class UserController extends Controller
{
    //Function that needs a lesson id to start it
    public function startLesson(Request $request)
    {
        $lesson = Lesson::where('id', $request["lesson_id"])->first();
        $user = Auth::user();
        return $lesson->users()->updateExistingPivot($user,['is_previous' => 1]);
    }
}

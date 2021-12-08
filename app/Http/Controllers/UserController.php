<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Lesson;
use Auth;

class UserController extends Controller
{
    //Stores a techer by recieving a coursename needs to be fixed to id?
    public function storeTeacher(/*Request $request*/)
    {
        //$lesson = Lesson::where("id", $request["lesson_id"])->first();
        $lesson = Lesson::where("id", 4)->first();
        $user = Auth::user();

        $user->lessons()->attach($lesson);

        return json_encode(array(
            'lesson_id' => $lesson->id,
            'user_id' => Auth::user()->id,
        ));
    }
}

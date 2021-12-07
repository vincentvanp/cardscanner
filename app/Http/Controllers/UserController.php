<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Lesson;
use Auth;

class UserController extends Controller
{
    //Stores a techer by recieving a coursename needs to be fixed to id?
    public function storeTeacher(Request $request)
    {
        $lesson = Lesson::where("id", $request["lesson_id"])->first();
        $user = Auth::user();

        $user->lessons()->attach($lesson);

        return [$lesson->id, Auth::user()->id]; //Naar Json fixen?
    }

    public function GetUserData(){
        return Auth::user();
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Auth;
use DB;
use Illuminate\Http\Request;


class LessonController extends Controller
{
    //test
    public function getLessons(){
        return Lesson::all();
    }

    //Function to return all the previous lessons of the logged in user
    public function getPreviousLessons() 
    {
        $user = Auth::user();
        $lessons = $user->lessons;
        return $lessons->toJson(); //volledige tabel returnen
    }
}

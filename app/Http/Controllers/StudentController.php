<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Lesson;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    //Function to retrieve attending students $request gives a lesson id?
    public function getAttendingStudents(Request $request)
    {
        $lesson = Lesson::where('id', $request["lesson_id"])->first();
        $students = $lesson->presentStudents;
        return $students->toJson();
    }

    //Used to collect abscent students trough a given lesson id
    public function getAbsentStudents(Request $request) 
    {
        $lesson = Lesson::where('id', $request["lesson_id"])->first();
        $students = $lesson->abscentStudents;
        return $students->toJson();
    }
}

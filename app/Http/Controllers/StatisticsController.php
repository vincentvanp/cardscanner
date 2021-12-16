<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\Student;
use Auth;

class StatisticsController extends Controller
{
    //Total scans for teacher
    public function totalScans(){
        
        

    }


    //% of people who were late
    public function latePercentage(/*Request $request*/){

        $lesson = Lesson::where('id', /*$request['id']*/ '1')->first();
        $totalStudents = count($lesson->students);
        $lateStudents = 0;

        dd($lesson->lateStudents($lesson->start));
        /*foreach($lesson->lateStudents($lesson->start) as $student){

            echo $student;

        }*/

    }

    //Average attendance per course
    public function courseAttendence(Request $request){

        $course = Course::where('id', $request['id'])->first();
        $totalStudents = 0;
        $attandingStudents = 0;

        foreach($course->lessons as $lesson){

            $totalStudents += count($lesson->students);
            $attandingStudents += count($lesson->presentStudents);

        }

        return json_encode(($attandingStudents/$totalStudents) * 100);

    }

}

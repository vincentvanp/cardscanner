<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Lesson;
use App\Models\Student;
use Auth;

class StatisticsController extends Controller
{
    //% of people who were late based on a given lesson id
    public function latePercentage(Request $request)
    {

        $lateStudents = array();

        $lesson = Lesson::where('id', $request['id'])->first();

        $students = $lesson->getStudents;

        if(count($students) == 0)
        {
            return 0;
        }

        foreach($students as $student)
        {

            if($student->pivot->updated_at > $lesson->start && $student->pivot->present)
            {

                array_push($lateStudents, $student);

            }

        }

        return json_encode((count($lateStudents)/count($students)) * 100);
        
    }

    //Average attendance per course
    public function courseAttendence(Request $request)
    {
        $course = Course::where('id', $request['id'])->first();

        $totalStudents = 0;
        $attandingStudents = 0;

        foreach($course->lessons as $lesson)
        {

            $totalStudents += count($lesson->students);
            $attandingStudents += count($lesson->presentStudents);

        }

        if($totalStudents == 0)
        {
            return 0;
        }

        return json_encode(round(($attandingStudents/$totalStudents) * 100));

    }

}

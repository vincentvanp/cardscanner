<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\User;
use App\Models\Course;
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
            'lessons' => $lessons,
            'user' => $user->makeHidden('name'),
        ));
    }

    //Function to return all the unstarted lessons of the logged in user 
    public function getUnstartedLessons()
    {
        $user = Auth::user();
        $lessons = $user->unstartedLessons;

        return json_encode(array(
            'lessons' => $lessons,
            'user' => $user->makeHidden('name'),
        ));
    }

    //Function that gives back lessons based on a given course id
    public function getUnstartedLessonsByCourse(Request $request)
    {
        $user = Auth::user();
        return $user->unstartedLessons->where('course_id', $request['course_id'])->toJson();
    }

    public function createLesson(Request $request)
    {
        
        $course = Course::where("name" , $request->course)->first();
        $user = Auth::user();
        $students = $course->students;


        $lesson = new Lesson;

        $lesson->name = $request->name;
        $lesson->course_id =  $course->id;
        $lesson->start = $request->date . " " . $request->start;
        $lesson->end = $request->date . " " . $request->end;
        $lesson->save();
        
        $user->lessons()->attach($lesson, ["is_previous" => 0]);

        foreach($students as $student)
        {
            $student->lessons()->attach($lesson,['present' => 0]);
        }
        
        return ['status' => 'OK'];
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\Course;
use App\Models\Lesson;

class DatabaseFillerController extends Controller
{
    public function getStudents(Request $request)
    {
        $course =  Course::where('id', $request['courseId'])->first(); 
        $lessons = $course->lessons;
        
        foreach($lessons as $lesson)
        {

            foreach($request['studentNames'] as $name)
            {

                $student = Student::firstOrNew(['name' => $name]);
                $student->save();

                if(!($student->lessons->contains($lesson)))
                {
                    $student->lessons()->attach($lesson,['present' => 0]);
                }

            }
            
        }
    }
}

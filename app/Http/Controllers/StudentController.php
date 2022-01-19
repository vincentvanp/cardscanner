<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Lesson;
use App\Events\populateUserTable;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DB;

class StudentController extends Controller
{
    //Function to retrieve attending students $request gives a lesson id
    public function getAttendingStudents(Request $request)
    {

        $students = DB::table('students')
                        ->leftJoin('student_has_lesson','students.id','=','student_has_lesson.student_id')
                        ->where('student_has_lesson.present',1)
                        ->where('student_has_lesson.lesson_id', '=', $request["lesson_id"])
                        ->select('students.name','students.serial_number','student_has_lesson.updated_at')
                        ->get();

        return $students->toJson();                
        
    }

    //Used to collect abscent students trough a given lesson id
    public function getAbsentStudents(Request $request) 
    {
        $students = DB::table('students')
                        ->leftJoin('student_has_lesson','students.id','=','student_has_lesson.student_id')
                        ->where('student_has_lesson.present',0)
                        ->where('student_has_lesson.lesson_id', '=', $request["lesson_id"])
                        ->select('students.name','students.serial_number','student_has_lesson.updated_at')
                        ->get();

        return $students->toJson();
    }

    public function deleteStudentPresent(Request $request) 
    {
        
        if(isset($request["serial"]))
        {
            $student = Student::where('serial_number', $request["serial"])->first();
        }
        elseif(isset($request["name"]))
        {
            $student = Student::where('name', $request["name"])->first();
        }
        else
        {
            return ['status' => 'ERROR'];
        }

        $lesson = Lesson::where('id', $request["lesson_id"])->first();
        
        $student->lessons()->updateExistingPivot($lesson,['present' => 0]);

        $time = Carbon::parse($student->lessons()->first()->pivot->updated_at)->format('H:i');

        event(new populateUserTable($student->name, $request["serial"], $time));

        return ['status' => 'OK'];
    }
}

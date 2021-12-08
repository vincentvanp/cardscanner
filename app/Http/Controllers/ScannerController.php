<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Scanner;
use App\Models\Student;
use App\Models\Lesson;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ScannerController extends Controller
{
    //Function to store a scanned student from pusher in the database
    public function storeStudent(Request $request)
    {
        $student = Student::where('serial_number', $request["serial"])->first();
        $lesson = Lesson::where('id', $request["lesson_id"])->first();

        $attendedLessons = $student->attendedLessons;

        //Change present to true by checking if studenthaslesson already exists
        if($student->lessons->contains($lesson)){
            $student->lessons()->updateExistingPivot($lesson,['present' => 1]);
        }

        else{
            $student->lessons()->attach($lesson,['present' => 1]);
        }

        $time = Carbon::parse($student->lessons()->first()->pivot->updated_at)->format('H:i');

        event(new populateUserTable($student->name, $request["serial"], $date));

        //return [$student->name, $request["serial"], $time];

        return json_encode(array( //testen
            'name' => $student->name,
            'serial' => $request["serial"],
            'time' => $time,
        ));

    }

    public function getScanners(){
        return Scanner::all();
    }
}

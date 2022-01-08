<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\populateUserTable;
use App\Models\Scanner;
use App\Models\Student;
use App\Models\Lesson;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Auth;

class ScannerController extends Controller
{
    //Returns all scanners to frontend
    public function getScanners()
    {
        return Scanner::all()->toJson();
    }

    //Function to store a scanned student from pusher in the database
    public function storeStudent(Request $request)
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
        $user = Auth::user();

        $attendedLessons = $student->attendedLessons;

        //Change present to true by checking if studenthaslesson already exists
        if($student->lessons->contains($lesson))
        {
            $student->lessons()->updateExistingPivot($lesson,['present' => 1]);
        }

        else
        {
            $student->lessons()->attach($lesson,['present' => 1]);
        }

        $time = Carbon::parse($student->lessons()->first()->pivot->updated_at)->format('H:i');

        event(new populateUserTable($student->name, $request["serial"], $time));
        
        $user->scancount += 1;
        $user->save();
            
        return ['status' => 'OK'];
    }

}

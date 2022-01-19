<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Imports\UsersImport;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Student;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class ExcelController extends Controller
{

    public function importFile()
    {
        $path = storage_path('\excel');
        $files = File::allfiles($path); 

        foreach($files as $file)
        {
            $filename = basename($file);;
            $fullpath = $path. '\\'.$filename;
            $fileOutput = Excel::toArray([],$fullpath);
            $course = Course::firstOrCreate([
                'name' => trim($filename,".xlsx"),
            ]);
            
            
            foreach($fileOutput as $fileout)
            {
                foreach(array_slice($fileout,1) as $row)
                {
                    $studentName= $row[2];
                    $student = Student::firstOrNew(['name' => $studentName]);
                    $student->save();
    
                    if(!($student->courses->contains($course)))
                    {
                        $student->courses()->attach($course);
                    }
                }
            }
           
        }        
        
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Imports\UsersImport;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class ExcelController extends Controller
{
    //

    public function importFile(){
        $path = storage_path('\excel');
        $files = File::allfiles($path); 

        foreach($files as $file){
            $filename = basename($file);;
            $fullpath = $path. '\\'.$filename;
            $fileOutput = Excel::toArray([],$fullpath);
            foreach($fileOutput as $fileout){
                dd($fileout);
            }
            
            $course = Course::firstOrCreate([
                'name' => trim($filename,".xlsx"),
            ]);
            // dd($fileOutput);
           
        }

       
        
        
    }
}

<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Course;
use App\Models\Student;
use Illuminate\Support\Facades\File;
use Maatwebsite\Excel\Facades\Excel;


class GetCourses extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'excel:get-courses';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get all courses from storage and save in database';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $path = storage_path('/excel');
        $files = File::allfiles($path); 

        foreach($files as $file)
        {
            $filename = basename($file);;
            $fullpath = $path. '//'.$filename;
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

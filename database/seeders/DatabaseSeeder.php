<?php

namespace Database\Seeders;

use App\Models\Student;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Lesson;
use App\Models\Scanner;
use App\Models\Course;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{

    private function studentsSeeder($name, $serial)
    {
        Student::create([
            'name' => $name,
            'serial_number' => $serial
        ]);
    }

    private function coursesSeeder($name)
    {
        Course::create([
            'name' => $name
        ]);
    }

    private function lessonsSeeder($name, $courseId)
    {
        Lesson::create([
            'name' => $name,
            'course_id' => $courseId,
            'start' => "2021-11-09 21:31:24.000000",
            'end' => "2021-11-09 23:31:24.000000"
        ]);
    }

    private function scannersSeeder($event)
    {
        Scanner::create([
            'event' => $event,
        ]);
    }
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        //user seeder for login
        User::create([
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('admin'),
        ]);
        User::create([
            'name' => 'john',
            'email' => 'john@gmail.com',
            'password' => bcrypt('paswoord'),
        ]);

        for ($i = 1; $i < 10; $i++) {
            $this->scannersSeeder('scanner-' . $i);
        }

       
    }
}

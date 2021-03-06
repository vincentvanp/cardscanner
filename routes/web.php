<?php

use App\Events\LessonCreated;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\oAuth\oAuthController;
use App\Http\Controllers\ScannerController;
use App\Http\Controllers\StartCourseForm;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\StatisticsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('oauth/login/{provider}', [oAuthController::class, 'redirectToProvider'])->name('oauth.login');
Route::get('oauth/callback/{provider}', [oAuthController::class, 'handleProviderCallback'])->name('oauth.callback');

Route::view('/{any}', 'dashboard')->where('any', '.*');

Route::group(['middleware' => ['auth']], function () {
    //only authorized users can access these routes
    Route::post('get-user-data', [ApiController::class, 'getUserData']);

    Route::post('user-has-lesson', [UserController::class, 'startLesson']);

    Route::post('previous-lessons', [LessonController::class, 'getPreviousLessons']);
    Route::post('get-lessons', [LessonController::class, 'getUnstartedLessons']);
    Route::post('get-lesson-by-course', [LessonController::class, 'getUnstartedLessonsByCourse']);
    Route::post('create-lesson', [LessonController::class, 'createLesson']);

    Route::post('get-scanners', [ScannerController::class, 'getScanners']);
    Route::post('student-has-lesson', [ScannerController::class, 'storeStudent']);

    Route::post('get-courses', [CourseController::class, 'getUserCourses']);
    Route::post('get-all-courses', [CourseController::class, 'getAllCourses']);

    Route::post('get-attending-students', [StudentController::class, 'getAttendingStudents']);
    Route::post('get-absent-students', [StudentController::class, 'getAbsentStudents']);
    Route::post('remove-student', [StudentController::class, 'deleteStudentPresent']);

    Route::post('get-course-attendence', [StatisticsController::class, 'courseAttendence']);
    Route::post('get-late-percentage', [StatisticsController::class, 'latePercentage']);
});



require __DIR__ . '/auth.php';

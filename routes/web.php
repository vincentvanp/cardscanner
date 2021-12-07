<?php

use App\Events\LessonCreated;
use App\Http\Controllers\lessonController;
use App\Http\Controllers\oAuth\oAuthController;
use App\Http\Controllers\ScannerController;
use App\Http\Controllers\StartCourseForm;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CourseController;
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

Route::view('/login-admin', 'login')->where('login', '.*');

Route::view('/{any}', 'dashboard')->where('any', '.*');

Route::group(['middleware' => ['auth']], function () {
    //only authorized users can access these routes


    Route::get('students', [StudentController::class, 'index']);
    Route::get('users', [UserController::class, 'index']);
    Route::post('lessons', [LessonController::class, 'index']);
    Route::post('scanners', [ScannerController::class, 'index']);
    Route::post('previous-lessons', [LessonController::class, 'getPreviousLessons']);
    Route::post('get-scanners', [ScannerController::class, 'getScanners']);
    Route::post('get-lessons', [LessonController::class, 'getLessons']);
    Route::post('get-user-data', [UserController::class, 'GetUserData']);
    Route::post('get-attending-students', [StudentController::class, 'getAttendingStudents']);
    Route::post('get-absent-students', [StudentController::class, 'getAbsentStudents']);
    Route::post('get-student', [StudentController::class, 'getAbsentStudents']);
    //Route::get('absentStudents/{lesson_id}', [lessonController::class, 'getAbsentStudents']);

    Route::post('student-has-lesson', [ScannerController::class, 'storeStudent']);
    Route::post('previous-courses', [LessonController::class, 'getDataLoggedInUser']);
});

require __DIR__ . '/auth.php';

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class ApiController extends Controller
{
    //userdata to frontend
    public function getUserData()
    {
        $user = Auth::user();
        return $user->toJson();
    }
}

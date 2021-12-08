<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use PhpParser\Builder\Class_;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'provider_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
    ];

    protected $visible = [
        'id',
        'name'
    ];

    public function lessons(){
        return $this->belongsToMany(Lesson::class, 'user_has_lesson', 'user_id')->withPivot('is_previous')->withTimeStamps();
    }

    public function previousLessons(){
        return $this->belongsToMany(Lesson::class, 'user_has_lesson', 'user_id')->wherePivot('is_previous', 1)->withTimeStamps();
    }

    public function unstartedLessons(){
        return $this->belongsToMany(Lesson::class, 'user_has_lesson', 'user_id')->wherePivot('is_previous', 0)->withTimeStamps();
    }
}

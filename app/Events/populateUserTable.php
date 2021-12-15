<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Auth;

class populateUserTable implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $name;
    public $id;
    public $time;
    
    /** 
    * 
    * 
    * @return void
    */

    public function __construct($name, $id, $time)
    {
        $this->name = $name;
        $this->id = $id;
        $this->time = $time;
    }

    /** 
    * 
    * 
    * @return \Illuminate\Broadcasting\Channel|array
    */
    public function broadcastOn()
    {
        return new Channel('backToFront');
    }

    public function broadcastAs()
    {
        return Auth::user()->id;
    }
}

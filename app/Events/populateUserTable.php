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
    public $serial_number;
    public $updated_at;
    
    /** 
    * 
    * 
    * @return voserial_number
    */

    public function __construct($name, $serial_number, $updated_at)
    {
        $this->name = $name;
        $this->serial_number = $serial_number;
        $this->updated_at = $updated_at;
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
        return strval(Auth::user()->id);
    }
}

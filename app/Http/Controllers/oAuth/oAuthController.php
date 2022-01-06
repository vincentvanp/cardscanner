<?php

namespace App\Http\Controllers\oAuth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

use App\Models\User;

class oAuthController extends Controller
{
    private function socialiteProvider($provider)
    {
        $redirectUrl = route('oauth.callback', ['provider' => $provider]);
        return Socialite::driver($provider)->redirectUrl($redirectUrl);
    }

    public function redirectToProvider($provider)
    {
        return $this->socialiteProvider($provider)->redirect();
    }

    public function handleProviderCallback($provider)
    {
        $providerUser = $this->socialiteProvider($provider)->user();

        //$user = User::firstOrNew(['provider_id' => $providerUser->getId()]);

        if (str_contains($providerUser->getEmail(),'@student.kdg.be') && !str_contains($providerUser->getEmail(),'rickert.goyvaerts') && !str_contains($providerUser->getEmail(), 'cedric.lenders')) 
        {
            return redirect('/login')->with('teacher', 'false');
        }

        $user = User::firstOrNew(['email' => $providerUser->getEmail()]);

        $user->name = $providerUser->getName();
        $user->provider_id = $providerUser->getId();

        $user->save();

        Auth::login($user, true);

        return redirect('dashboard');
    }
}

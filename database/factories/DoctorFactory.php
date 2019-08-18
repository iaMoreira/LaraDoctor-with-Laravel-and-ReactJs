<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Doctor;
use App\User;
use Faker\Generator as Faker;

$factory->define(Doctor::class, function (Faker $faker) {
    return [
        'user_id' => function(){
            $user = factory(User::class)->create(['role_id' => 2]);
            return $user->id;
        },
        'crm' => $faker->numberBetween(100000000, 9999999999),
        'specialties' => [
            1,2
        ]
    ];
});

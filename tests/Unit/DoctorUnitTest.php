<?php

namespace Tests\Unit;

use App\Doctor;
use App\User;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class DoctorUnitTest extends TestCase
{
    public function setup() : void
    {
        parent::setUp();


    }

    public function testCanCreateDoctor()
    {
        User::query()->delete();
        $data = [
            "name"                      => "Hugo Andrade Moreira",
            "email"                     => "ianm@gmail.com",
            "password"                  => "12345678",
            "password_confirmation"     => "12345678",
            "phone"                     => "(73) 98150-0227",
            "cpf"                       => "999.999.999-99",
            "avatar"                    => "https://static.vix.com/pt/sites/default/files/styles/1x1/public/d/deluca-greys-anatomy-0817-1400x700.jpg",
            "birth_date"                => "16/04/1998",
            "crm"                       => "15240439",
            "specialties"               => [
                1,2
            ]
        ];
        $response = $this->post('api/doctor', $data)
        ->assertStatus(201)
        ->assertJsonStructure(array_keys($data), $data);
        $this->assertCount(1, Doctor::all());
    }

    public function testNameRequired()
    {

        $user = factory('App\User')->make(['name' => null]);
        $doctor = factory('App\Doctor')->make(['user_id' => $user->id]);

        $response = $this->post('/api/doctor', $doctor->toArray())
        ->assertJson([
            "error" => "validation_error",
            "message" => [
                "name" => [
                    "O nome é obrigatório. "
                ],
            ]
        ]);
            //$response->dump();
    }

    public function testSpecialtiesDistinct()
    {
        $data = [
            "name"                      => "Hugo Andrade Moreira",
            "email"                     => "ianm@gmail.com",
            "password"                  => "12345678",
            "password_confirmation"     => "12345678",
            "phone"                     => "(73) 98150-0227",
            "cpf"                       => "999.999.999-99",
            "avatar"                    => "https://static.vix.com/pt/sites/default/files/styles/1x1/public/d/deluca-greys-anatomy-0817-1400x700.jpg",
            "birth_date"                => "16/04/1998",
            "crm"                       => "15240439",
            "specialties"               => [
                1,1
            ]
        ];

        $response = $this->post('/api/doctor', $data)
        ->assertJson([
            "error" => "validation_error",
            "message" => [
                "specialties.0" => [
                    'O campo de especialidades não pode conter itens ambíguos. ',
                ],
                "specialties.1" => [
                    'O campo de especialidades não pode conter itens ambíguos. ',
                ]
            ]
        ]);
            //$response->dump();
    }

    public function testUpdateDoctor(){
        $data = [
            "name"                      => "Ian Andrade Moreira",
            "email"                     => "ianm@gmail.com",
            "password"                  => "12345678",
            "password_confirmation"     => "12345678",
            "phone"                     => "(73) 98150-0227",
            "cpf"                       => "999.999.999-99",
            "avatar"                    => "https://static.vix.com/pt/sites/default/files/styles/1x1/public/d/deluca-greys-anatomy-0817-1400x700.jpg",
            "birth_date"                => "16/04/1998",
            "crm"                       => "15240439",
            "specialties"               => [
                1,2
            ]
        ];
        $doctor = Doctor::first();
        $response = $this->put('api/doctor/'.$doctor->id, $data);

        $this->assertEquals("Ian Andrade Moreira", Doctor::first()->user->name);
    }

    public function testDeleteDoctor()
    {

        $user = factory('App\User')->make(['name' => null]);
        $doctor = factory('App\Doctor')->make(['user_id' => $user->id]);

        $this->delete('/api/doctor/'.$doctor->id);
        $this->assertDatabaseMissing('doctors',['id'=> $doctor->id]);

    }







}

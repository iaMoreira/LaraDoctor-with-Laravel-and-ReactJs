<?php

namespace App\Http\Controllers;

use App\Doctor;
use App\Specialty;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(){

        $doctors = Doctor::with('user')->paginate(3);
        $specialties = Specialty::all();

        return view('welcome', compact('doctors', 'specialties'));
    }

    public function search(Request $request, Doctor $doctor){
        $data = $request->except('_token');
        $doctors = $doctor->search($data, 3);
        $specialties = Specialty::all();
        return view('welcome', compact( 'doctors', 'specialties', 'data'));
    }
}

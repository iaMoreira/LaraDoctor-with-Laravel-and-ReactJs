<?php

namespace App\Http\Controllers;

use App\Doctor;
use App\Http\Requests\DoctorFormRequest;
use App\Specialty;
use App\User;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class DoctorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $doctors = Doctor::with('user', 'specialties')->get();
        return response()->json(['doctors' => $doctors]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Doctor $doctor) //DoctotFormRequest não funcionou
    {
        $user = new User();
        try {
            $validator = $doctor->validator($request);
            if($validator->fails()){
                return response()->json([
                    "error" => 'validation_error',
                    "message" => $validator->errors(),
                ], 422);
            }
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->phone = $request->phone;
            $user->avatar = $request->avatar;
            $user->cpf = $request->cpf;
            $user->role_id = 2;
            $user->birth_date = Carbon::createFromFormat('d/m/Y', $request['birth_date']);
            if(!$user->save()){
                return response()->json(['error' => 'error ao criar o usuário'], 400);
            }
            $doctor->crm = $request->crm;
            $doctor->user_id = $user->id;
            if(!$doctor->save()){
                $user->delete();
                return response()->json(['error' => 'error ao cadastrar o médico'], 401);
            }

            foreach ($request->specialties as $value) {
                $specialty = Specialty::find(intval($value));
                $doctor->specialties()->attach($specialty);
            }

            $doctor->user = $user;
            $doctor->specialties =$doctor->specialties;

            return response()->json(['doctor' => $doctor]);
        } catch (Exception $e) {
            $user->delete();
            return response()->json([ 'error' => 'Desculpe servidor em manutenção, tente mais tarde.'], 402);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Doctor  $doctor
     * @return \Illuminate\Http\Response
     */
    public function show(Doctor $doctor)
    {
        $doctor->user = $doctor->user;
        $doctor->specialties =$doctor->specialties;
        return response()->json($doctor);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Doctor  $doctor
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Doctor $doctor)
    {
        try {
            $validator = $doctor->validator($request);

            if($validator->fails()){
                return response()->json([
                    "error" => 'validation_error',
                    "message" => $validator->errors(),
                ], 422);
            }
            $user = $doctor->user;
            $user->name = $request->name;
            $user->email = $request->email;
            $user->avatar = $request->avatar;
            $user->password = Hash::make($request->password);
            $user->phone = $request->phone;
            $user->cpf = $request->cpf;
            $user->birth_date = Carbon::createFromFormat('d/m/Y', $request['birth_date']);
            if(!$user->save()){
                return response()->json(['error' => 'error ao atualizar dados do usuário'], 400);
            }
            $doctor->crm = $request->crm;
            $doctor->specialties()->detach();
            if($request->specialties != null){
                foreach ($request->specialties as $value) {
                    $specialty = Specialty::findOrFail($value);
                    $doctor->specialties()->attach($specialty);
                }
            }

            $user->password = null;
            $doctor->user = $user;
            $doctor->specialties =$doctor->specialties;
            return response()->json(['doctor' => $doctor]);
        } catch (Exception $e) {
            return response()->json([ 'error' => 'Desculpe servidor em manutenção, tente mais tarde.'], 402);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Doctor  $doctor
     * @return \Illuminate\Http\Response
     */
    public function destroy(Doctor $doctor)
    {
        try {
            if($doctor->user->delete()){
                return response()->json(['success' => 'Exclusão bem sucedida!'], 200);
            }else{
                return response()->json(['error' => 'error ao deletar o médico.'], 400);
            }
        } catch (Exception $e) {
            return response()->json([ 'error' => 'Desculpe servidor em manutenção, tente mais tarde.'], 402);
        }
    }


}

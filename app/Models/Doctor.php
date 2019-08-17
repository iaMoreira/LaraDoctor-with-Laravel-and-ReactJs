<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;

class Doctor extends Model
{
    protected $fillable = ['crm', 'user_id'];

    public function specialties()
    {
        // return $this->belongsToMany(Specialty::class, DoctorSpecialty::class, 'doctor_id', 'specialty_id');
        return $this->belongsToMany(Specialty::class, 'doctor_specialties', 'doctor_id', 'specialty_id');
    }

    public function user ()
    {
        return $this->belongsTo(User::class);
    }
    public function search(Array $data, $totalPage){
        $doctors = $this->with('user')
        ->where(function ($query) use ($data){
            if(isset($data['crm'])){
                $query->where('crm', $data['crm'])
                ->orWhere('crm', 'like', '%'.$data['crm'].'%');
            }
            if(isset($data['name'])){
                $query->whereHas('user', function ($query) use ($data){
                    $query->where('name', 'like', '%'.$data['name'].'%');
                });
            }
            if(isset($data['specialty'])){
               $query->whereHas('specialties', function ($query) use ($data){
                    $query->where('specialty_id', $data['specialty']);

                });
            }
        })->paginate($totalPage);

        return $doctors;
    }

    public function validator($request){
        if($request->doctor != null){
            $id = $request->doctor->id;
            $doctor = $this->findOrFail($id);
            $email = 'required|max:255|email|unique:users,email,'.$doctor->user_id;
            $crm = 'required|numeric|unique:doctors,crm,'.$id;
        }else{
            $email = 'required|max:255|email|unique:users';
            $crm = 'required|numeric|unique:doctors';

        }

        return Validator::make($request->all(),[
            'name'              => 'required|max:255',
            'cpf'               => 'required|regex:/^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2})$/i', // fazer um OU com o CNPJ
            'birth_date'        => 'before:today|date_format:d/m/Y',
            'phone'             => 'min:15|regex:/^(\([0-9]{2}\))\s([9]{1})?([0-9]{4})-([0-9]{4})$/i',
            'email'             => $email,
            'crm'               => $crm,
            "specialties"       => "required|array|min:2",
            "specialties.*"     => "required|integer|distinct",
            'password'          => 'required|min:8|max:32|required_with:password_confirmation|same:password_confirmation',
        ],
        [
            'name.required'             => 'O nome é obrigatório. ',
            'name.max'                  => 'O nome deve ter no máximo 255 digitos. ',
            'name_social.required'      => 'O nome social é obrigatório. ',
            'name_social.max'           => 'O nome social deve ter no máximo 255 digitos. ',
            'birth_date.required'       => 'A data de nascimento é obrigatória. ',
            'birth_date.before'         => 'A data de nascimento não pode estar no futuro. ',
            'birth_date.date_format'    => 'A data de nascimento está no formato inválido. ',
            'cpf.required'              => 'O CPF/CNPJ é obrigátorio. ',
            'cpf.regex'                 => 'O CPF/CNPJ está incompleto ou não é válido. ',
            'phone.min'                 => 'O número de telefone incompleto. ',
            'phone.regex'               => 'O número de telefone inválido. Verifique se não está faltando o 9 após o ddd. ',
            'email.required'            => 'O campo de email está vazio. ',
            'email.unique'              => 'O email inserido já está está em uso. ',
            'email.max'                 => 'O email pode ter no máximo 255 caracteres. ',
            'email.email'               => 'O email é inválido. ',
            'password.required'         => 'O campo de senha está vazio. ',
            'password.min'              => 'A senha deve ter no mínimo 8 digitos. ',
            'password.max'              => 'A senha deve ter no máximo 32 digitos. ',
            'password.same'             => 'Senhas não são iguais, corrija e tente novamente. ',
            'password.required_with'    => 'Senhas não são iguais. ',
            'crm.numeric'               => 'O CRM deve conter apenas números. ',
            'crm.unique'                => 'O CRM já foi inserido. ',
            'crm.required'              => 'Inserir o código do CRM é obrigátorio. ',
            'specialties.min'           => 'O campo de especialidades deve conter no mínimo duas opções. ',
            'specialties.array'         => 'O campo de especialidades deve ser uma lista. ',
            'specialties.required'      => 'O campo de especialidades é obrigatório. ',
            'specialties.*.integer'     => 'O campo de especialidades deve conter apenas números inteiros. ',
            'specialties.*.distinct'    => 'O campo de especialidades não pode conter itens ambíguos. ',
        ] );
    }

}

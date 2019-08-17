<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DoctorFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        if($this->request->get('id') != null){
            $id = $this->request->get('id');
            $email = 'required|max:255|email|unique:users,email,'.$id;
            $crm = 'required|numeric|max:10|unique:doctors,crm'.$id;
        }else{
            $email = 'required|max:255|email|unique:users';
            $crm = 'required|numeric|max:10|unique:doctors';

        }

        return [
            'name'              => 'required|max:255',
            'cpf'               => 'required|regex:/^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2})$/i', // fazer um OU com o CNPJ
            'birth_date'        => 'before:today|date_format:d/m/Y',
            'phone'             => 'min:15|regex:/^(\([0-9]{2}\))\s([9]{1})?([0-9]{4})-([0-9]{4})$/i',
            'email'             => $email,
            'crm'               => $crm,
            'password'          => 'required|min:8|max:32|required_with:password_confirmation|same:password_confirmation',
        ];
    }
    public function messages()
    {
        return[
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
            'crm.max'                   => 'O CRM pode ter no máximo 10 digitos. ',
            'crm.numeric'               => 'O CRM deve conter apenas números. ',
            'crm.required'              => 'Inserir o código do CRM é obrigátorio. ',
        ];
    }
}

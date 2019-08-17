<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
    protected $fillable = ['crm'];

    public function specialties()
    {
        return $this->belongsToMany(Specialty::class, DoctorSpecialty::class, 'doctor_id', 'specialty_id');
        // return $this->belongsToMany(Specialty::class, 'doctor_speciaties', 'doctor_id', 'specialty_id');
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

}

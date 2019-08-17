<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Specialty extends Model
{
    protected $fillable = ['specialty'];

    public function doctors ()
    {
        return $this->belongsToMany(Doctor::class, DoctorSpecialty::class, 'specialty_id', 'doctor_id');
    }

}

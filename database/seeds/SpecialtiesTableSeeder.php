<?php

use App\Specialty;
use Illuminate\Database\Seeder;

class SpecialtiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Specialty::insert([
            [
                'specialty' => 'ALERGOLOGIA'
            ],
            [
                'specialty' => 'ANGIOLOGIA'
            ],
            [
                'specialty' => 'BUCO MAXILO'
            ],
            [
                'specialty' => 'CARDIOLOGIA CLÍNICA'
            ],
            [
                'specialty' => 'CARDIOLOGIA INFANTIL'
            ],
            [
                'specialty' => 'CIRURGIA CABEÇA E PESCOÇO'
            ],
            [
                'specialty' => 'CIRURGIA CARDÍACA'
            ],
            [
                'specialty' => 'CIRURGIA DE CABEÇA/PESCOÇO'
            ],
            [
                'specialty' => 'CIRURGIA DE TÓRAX'
            ],
            [
                'specialty' => 'CIRURGIA GERAL'
            ],
            [
                'specialty' => 'CIRURGIA PEDIÁTRICA'
            ],
            [
                'specialty' => 'CIRURGIA PLÁSTICA'
            ],
            [
                'specialty' => 'CIRURGIA TORÁCICA'
            ],
            [
                'specialty' => 'CIRURGIA VASCULAR'
            ],
            [
                'specialty' => 'CLÍNICA MÉDICA'
            ],
        ]);
    }
}

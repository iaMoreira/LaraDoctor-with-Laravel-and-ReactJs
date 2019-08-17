<p  align="center"><img  src="https://laravel.com/assets/img/components/logo-laravel.svg"></p>
<p  align="center">

<a  href="https://travis-ci.org/laravel/framework"><img  src="https://travis-ci.org/laravel/framework.svg"  alt="Build Status"></a>

<a  href="https://packagist.org/packages/laravel/framework"><img  src="https://poser.pugx.org/laravel/framework/v/stable.svg"  alt="Latest Stable Version"></a>



## Instalação

Clone o repositório

`git clone https://github.com/iaMoreira/teste-doctor.git`

Entre na pasta

`cd teste-doctor`

Instale as dependências usando o Composer

`composer install`

 Copie o arquivo de exemplo de configuração `.env.example` para `.env` e edite o que for necessário:  

`$ cp .env.example .env `

Gere uma nova chave para aplicação

`php artisan key:generate`

  Faça a migração e popule o seu banco de dados

`$ php artisan migrate:refresh --seed`

Caso sua aplicação não esteja dentro do apache inicio o seu próprio servidor:

`$ php artisan serve`


## Rotas
|Method| URI | Name | Action |
|--|--|--|--|
| GET\|HEAD |/|  | 	App\Http\Controllers\HomeController@index|
| GET\|HEAD |/api/doctor| doctor.index | 	App\Http\Controllers\DoctorController@index|
| POST |/api/doctor| doctor.store | 	App\Http\Controllers\DoctorController@store|
| GET\|HEAD |/api/doctor/{id}| doctor.show | App\Http\Controllers\DoctorController@show|
| PUT\|PATH |/api/doctor/{id}| doctor.update |App\Http\Controllers\DoctorController@update|
| DELETE |/api/doctor/{id}| doctor.destroy |App\Http\Controllers\DoctorController@destroy|
| GET\|POST |/search| search |App\Http\Controllers\HomeController@search|




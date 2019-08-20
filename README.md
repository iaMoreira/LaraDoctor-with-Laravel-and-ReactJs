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

Baixe as dependências do `Javascript` 

`$ npm update`

Transpile o código do ReactJS 

`$ npm run dev`

Inicie o seu próprio servidor

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



## Executando Teste TDD 

No diretótio do projeto execute o `phpunit` para executar o script de testes

`$ ./vendor/bin/phpunit`


## Exemplo de teste na API

{
	"name": "Ian Andrade Moreira", 
	"email": "ianmoreira80@gmail.com", 
	"password": "12345678", 
	"password_confirmation": "12345678", 
	"phone": "(73) 98150-0227", 
	"cpf": "999.999.999-99", 
	"avatar": "https://static.vix.com/pt/sites/default/files/styles/1x1/public/d/deluca-greys-anatomy-0817-1400x700.jpg", 
	"birth_date": "16/04/1998", 
	"crm": "152049", 
	"specialties": [ 
		1, 2, 3 
	] 
}

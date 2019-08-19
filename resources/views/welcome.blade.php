<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">


    </head>
    <body>
        <nav class="navbar navbar-expand-md navbar-light navbar-laravel">
            <div class="container">
                <a class="navbar-brand" >
                    Good Doctor
                </a>
            </div>
        </nav>
        <div class="container">
            <h1 ><b>Lista de médicos </b></h1>

            <div class="row">
                <div style="background: #ddd; border-radius: 4px; padding: 2rem; " class="col-sm-12 col-md-6 col-lg-3">
                    <h4><b>Filtros</b></h4>
                    <hr>

                    <div class="inputsFiltro">
                    <form action="{{route('search')}}" method="POST">

                        @csrf

                        <div class="form-group">
                            <label for="" class="col-sm-12 col-form-label"> NOME</label>
                            <div class="col-sm-12">
                                <input type="text" name="name" id="name" class="form-control @error('name') is-invalid @enderror" value="{{old('name')}}" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-sm-12 col-form-label"> CRM</label>
                            <div class="col-sm-12">
                                <input type="text" name="crm" id="crm" class="form-control @error('crm') is-invalid @enderror" value="{{old('crm')}}" >
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="" class="col-sm-12 col-form-label">ESPECIALIDADE</label>
                            <div class="col-sm-12">
                                <select name="specialty" id="specialty" class="form-control" value="{{old('specialty')}}" data-live-search="true" >
                                    <option value=""> Selecione uma especialidade</option>
                                    @foreach($specialties as $specialty)
                                        <option value="{{ $specialty->id }}"  {{ (collect(old('specialty'))->contains($specialty->id)) ? 'selected':'' }}>{{$specialty->specialty}}</option>
                                    @endforeach
                                </select>
                            </div>
                        </div>
                        <div style="text-align: center">
                            <button class="btn  btn-lg btn-primary" type="submit" >BUSCAR</button>
                        </div>
                        <div style="text-align: center; margin-top: 10px">
                            <a class="btn  btn-success" href="{{url('create')}}" >Cadastrar</a>
                        </div>

                    </form>
                </div>
                </div>
                <div class="col-sm-12 col-md-6 col-lg-9 " >
                        <div class="row" style="background: #ddd; border-radius: 4px; padding: 2rem; margin-left: 1rem;">
                        @foreach ($doctors as $doctor)
                        <div class="col-sm-4">
                            <div class="card">
                                    {{--  <img style="width: auto; height:200px;" src="http://s.glbimg.com/jo/g1/f/original/2010/05/07/meredith-grey.jpg"/>  --}}
                                    <div id="img_front" onclick="openFile()"  alt="" style="
                                    background-image: url('{{ ($doctor->user->avatar) ? asset($doctor->user->avatar) : 'http://s.glbimg.com/jo/g1/f/original/2010/05/07/meredith-grey.jpg'}}');
                                    background-repeat: no-repeat;
                                    background-size: cover;
                                    border-radius: 4px;
                                    background-position: center;
                                    width: 100%;
                                    height: 200px;
                                    max-width: 100%;
                                    max-height: 200px;"></div>
                                <h6><b>NOME: </b>{{$doctor->user->name}}</h6>
                                <h6><b>CRM: </b>{{$doctor->crm}}</h6>
                            </div>
                        </div>
                        @endforeach
                        <div class="col-12 mt-3">

                            @if(isset($data))
                            {!!$doctors->appends($data)->links() !!}

                            @else
                            {!!$doctors->links() !!}
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>

import React, { Component } from "react";
import axios from "axios";

import "./List.css";

export default class List extends Component {
    constructor(props) {
        super();
        this.state = {
            doctors: []
        };
    }

    componentDidMount() {
        axios.get("/api/doctor").then(response => {
            this.setState({
                doctors: response.data
            });
        });
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-3 nav-lateral">
                        <h4>
                            <b>Filtros</b>
                        </h4>
                        <hr />
                        <form onSubmit={this.hadleFiltro}>


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

                    </form>
                    </div>
                </div>
            </div>
        );
    }
}

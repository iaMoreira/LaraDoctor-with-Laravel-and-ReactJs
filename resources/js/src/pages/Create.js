import React, { Component } from "react";
import Select from "react-select";
// import { Container } from './styles';
import "react-select/dist/react-select.css";

export default class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            phone: "",
            cpf: "",
            email: "",
            birth_date: "",
            crm: "",
            password: "",
            specialties: [],
            errors: []
        };

        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCreateNewDoctor = this.handleCreateNewDoctor.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.handleMultiChange = this.handleMultiChange.bind(this);
    }
    componentDidMount() {
        axios.get("/api/specialties").then(response => {
            this.setState({
                specialties: response.data
            });
        });
    }
    handleMultiChange(option) {
        this.setState(state => {
            return {
                specialties: option
            };
        });
    }
    handleCreateNewDoctor(event) {
        event.preventDefault();

        const { history } = this.props;

        const doctor = {
            name: this.state.name,
            phone: this.state.phone,
            cpf: this.state.cpf,
            email: this.state.email,
            birth_date: this.state.birth_date,
            crm: this.state.crm,
            password: this.state.password,
            name: this.state.name
        };

        axios
            .post("/api/doctor", doctor)
            .then(response => {
                // redirect to the homepage
                history.push("/");
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.message
                });
            });
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    hasErrorFor(field) {
        return !!this.state.errors[field];
    }

    renderErrorFor(field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className="invalid-feedback">
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            );
        }
    }

    render() {
        const { specialties } = this.state;
        return (
            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Cadastra Médico</div>
                            <div className="card-body">
                                <form onSubmit={this.handleCreateNewDoctor}>
                                    <div className="form-group">
                                        <label htmlFor="name">Nome</label>
                                        <input
                                            id="name"
                                            type="text"
                                            className={`form-control ${
                                                this.hasErrorFor("name")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor("name")}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="crm">CRM</label>
                                        <input
                                            id="crm"
                                            type="text"
                                            className={`form-control ${
                                                this.hasErrorFor("crm")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="crm"
                                            value={this.state.crm}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor("crm")}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Telefone</label>
                                        <input
                                            id="phone"
                                            type="phone"
                                            className={`form-control ${
                                                this.hasErrorFor("phone")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="phone"
                                            value={this.state.phone}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor("phone")}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cpf">CPF</label>
                                        <input
                                            id="cpf"
                                            type="text"
                                            className={`form-control ${
                                                this.hasErrorFor("cpf")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="cpf"
                                            value={this.state.cpf}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor("cpf")}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="birth_date">
                                            Data de nascimento
                                        </label>
                                        <input
                                            id="birth_date"
                                            type="text"
                                            className={`form-control ${
                                                this.hasErrorFor("birth_date")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="birth_date"
                                            value={this.state.birth_date}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor("birth_date")}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            className={`form-control ${
                                                this.hasErrorFor("email")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor("email")}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Senha</label>
                                        <input
                                            id="password"
                                            type="password"
                                            className={`form-control ${
                                                this.hasErrorFor("password")
                                                    ? "is-invalid"
                                                    : ""
                                            }`}
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor("password")}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Especialidades</label>
                                        <Select
                                            id="specialties"
                                            name="specialties"
                                            multiple={true}
                                            onChange={this.handleMultiChange}
                                        >
                                             {specialties.map(specialty => (
                                                <option
                                                    key="{specialty.id}"
                                                    value="{specialty.id}"
                                                >
                                                    {specialty.specialty}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                    <button className="btn btn-primary">
                                        Cadastrar
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

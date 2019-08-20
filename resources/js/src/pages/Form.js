import React, { useEffect,  useState } from 'react';

import api from '../services/api';
// import { Container } from './styles';

export default function Form({match, history}) {
    const [specialties, setSpecialties] = useState([])
    const [crm, setCrm] = useState([])
    const [birth_date, setBirthDate] = useState([])
    const [name, setName] = useState([])
    const [phone, setPhone] = useState([])
    const [email, setEmail] = useState([])
    const [password, setPassword] = useState([])
    const [password_confirmation, setPasswordConfirmation] = useState([])
    const [cpf, setCPF] = useState([])
    const [errors, setErrors] = useState([])
    const [options, setOptions] = useState([])
    useEffect( () => {
        async function loadSpecialties() {
            const response = await api.get('/specialties', {
            })         
            setSpecialties(response.data)
        }
        async function loadDoctor() {
            const response = await api.get('/doctor/'+match.params.id, {
            })         
            const doctor = response.data
            setName(doctor.user.name);
            setPhone(doctor.user.phone);
            setCPF(doctor.user.cpf);
            setEmail(doctor.user.email);
            setCrm(doctor.crm);
            setOptions(doctor.specialties.map(specialty => specialty.id));
            const date = new Date(doctor.user.birth_date).toLocaleDateString()
            setBirthDate(date);
        }
        loadSpecialties()
        if(match.params.id){
            loadDoctor()
        }
    }, [match.params.id])
    async function handleCreateNewDoctor(event) {
        event.preventDefault();

        const doctor = {
            name,
            phone,
            cpf,
            email,
            birth_date,
            crm,
            password,
            password_confirmation,
            specialties: options
        };
        let route = "";
        if(match.params.id){
            route = "/doctor/" + match.params.id;
            api.put(route, doctor)
            .then(response => {
                history.push("/");
            })
            .catch(error => {
                setErrors(error.response.data.message);
            });
        }else{
            route = "/doctor";
            api.post(route, doctor)
                .then(response => {
                    history.push("/");
                })
                .catch(error => {
                    setErrors(error.response.data.message);
                });
        }
    }
    async function handleMultiChange(event) {
        let newVal = event.target.value
        let stateVal = options
        console.log(stateVal)
        stateVal.indexOf(newVal) === -1
          ? stateVal.push(newVal)
          : stateVal.length === 1
            ? (stateVal = [])
            : stateVal.splice(stateVal.indexOf(newVal), 1)
    
        setOptions(stateVal);
    }

    function hasErrorFor(field) {
        return errors[field];

    }

    function renderErrorFor(field) {
        if (hasErrorFor(field)) {
            return (
                <span className="invalid-feedback">
                    <strong>{errors[field][0]}</strong>
                </span>
            );
        }
    }

return (
    <div className="container py-4">
    <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="card">
                <div className="card-header">{(!match.params.id) ? "Cadastro" : "Atualização" } de Médico</div>
                <div className="card-body">
                    <form onSubmit={handleCreateNewDoctor}>
                        <div className="form-group">
                            <label htmlFor="name">NOME</label>
                            <input id="name" type="text" placeholder="Dr(a). House"
                                className={`form-control ${ hasErrorFor("crm") ? "is-invalid": "" }`}
                                name="name"value={name} onChange={e => setName(e.target.value)}
                            />
                            {renderErrorFor("name")}
                        </div>
                         <div className="form-group">
                            <label htmlFor="crm">CRM</label>
                            <input
                           
                                type="text"
                                className={`form-control ${
                                    hasErrorFor("crm")
                                        ? "is-invalid"
                                        : ""
                                }`}
                                value={crm}
                                onChange={e => setCrm(e.target.value)}
                            />
                            {renderErrorFor("crm")}
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone">TELEFONE</label>
                            <input
                                id="phone"
                                type="phone"
                                placeholder="(73) 98150-0227"
                                className={`form-control ${
                                    hasErrorFor("phone")
                                        ? "is-invalid"
                                        : ""
                                }`}
                                name="phone"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                            />
                            {renderErrorFor("phone")}
                        </div>
                        <div className="form-group">
                            <label htmlFor="cpf">CPF</label>
                            <input id="cpf" type="text"
                                placeholder="000.000.000-00"
                                className={`form-control ${
                                    hasErrorFor("cpf")
                                        ? "is-invalid"
                                        : ""
                                }`}name="cpf" value={cpf}
                                onChange={e => setCPF(e.target.value)}
                            />
                            {renderErrorFor("cpf")}
                        </div>

                        <div className="form-group">
                            <label htmlFor="birth_date">
                                DATA DE NASCIMENTO
                            </label>
                            <input
                                id="birth_date"
                                type="text"
                                placeholder={new Date(1000000000000).toLocaleDateString()}
                                className={`form-control ${
                                    hasErrorFor("birth_date")
                                        ? "is-invalid"
                                        : ""
                                }`}
                                name="birth_date"
                                value={birth_date}
                                onChange={e => setBirthDate(e.target.value)}
                            />
                            {renderErrorFor("birth_date")}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">EMAIL</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="exemplo@exemplo.com"
                                className={`form-control ${
                                    hasErrorFor("email")
                                        ? "is-invalid"
                                        : ""
                                }`}
                                name="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            {renderErrorFor("email")}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">SENHA</label>
                            <input
                                id="password"
                                type="password"
                                className={`form-control ${
                                    hasErrorFor("password")
                                        ? "is-invalid"
                                        : ""
                                }`}
                                name="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            {renderErrorFor("password")}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password"> 
                                CONFIRMAR SENHA
                            </label>
                            <input
                                type="password"
                                className={`form-control ${
                                    hasErrorFor(
                                        "password_confirmation"
                                    )
                                        ? "is-invalid"
                                        : ""
                                }`}
                                name="password_confirmation"
                                value={password_confirmation}
                                onChange={e => setPasswordConfirmation(e.target.value)}
                            />
                            {renderErrorFor(
                                "password_confirmation"
                            )}
                        </div>
                       <div className="form-group">
                            <label htmlFor="">ESPECIALIDADES</label>
                            <select
                                id="specialties"
                                name="specialties"
                                value={options}
                                multiple={true}
                                data-live-search="true"
                                className={`form-control selectpicker ${
                                    hasErrorFor("specialties")
                                        ? "is-invalid"
                                        : ""
                                }`}
                                onChange={handleMultiChange}
                            >
                                {specialties.map(specialty => (
                                    <option
                                        key={specialty.id}
                                        value={specialty.id}
                                    >
                                        {specialty.specialty}
                                    </option>
                                ))}
                            </select>
                                  {renderErrorFor( "specialties")}
                        </div>
                        
                        <button className="btn btn-primary">
                        {(!match.params.id) ? "Cadastrar" : "Atualizar" }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
  );
}

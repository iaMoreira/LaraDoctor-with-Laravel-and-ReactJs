import React, { useEffect,  useState } from 'react';

import api from '../services/api';
// import { Container } from './styles';

export default function Show({match, history}) {
  const [crm, setCrm] = useState([])
  const [birth_date, setBirthDate] = useState([])
  const [name, setName] = useState([])
  const [phone, setPhone] = useState([])
  const [email, setEmail] = useState([])
  const [cpf, setCPF] = useState([])
  const [options, setOptions] = useState([])  
  useEffect( () => {
    async function loadDoctor() {
        const response = await api.get('/doctor/'+match.params.id, {
        })         
        const doctor = response.data
        setName(doctor.user.name);
        setPhone(doctor.user.phone);
        setCPF(doctor.user.cpf);
        setEmail(doctor.user.email);
        setCrm(doctor.crm);
        setOptions(doctor.specialties.map(specialty => specialty.specialty));
        const date = new Date(doctor.user.birth_date).toLocaleDateString()
        setBirthDate(date);
    }
    loadDoctor()
}, [match.params.id])
  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
              <div className="card">
                  <div className="card-header">Ficha do Médico</div>
                  <div className="card-body">
                    <div className="form-group">
                      <label>NOME</label>
                      <input  className="form-control" disabled value={name} />
                    </div>
                    <div className="form-group">
                      <label>CRM</label>
                      <input  className="form-control" disabled value={crm} />
                    </div>
                    <div className="form-group">
                      <label>TELEFONE</label>
                      <input  className="form-control" disabled value={phone} />
                    </div>
                    <div className="form-group">
                      <label>DATA DE NASCIMENTO</label>
                      <input  className="form-control" disabled value={birth_date} />
                    </div>
                    <div className="form-group">
                      <label>EMAIL</label>
                      <input  className="form-control" disabled value={email} />
                    </div>
                    <div className="form-group">
                      <label>CPF</label>
                      <input  className="form-control" disabled value={cpf} />
                    </div>
                    <div className="form-group">
                      <label>ESPECIALIDADES</label>
                      <textarea  className="form-control" disabled 
                        value={options.map(specialty => " "+specialty)} />
                    </div>
              </div>
            </div>
        </div>
      </div>
    </div>

  );
}

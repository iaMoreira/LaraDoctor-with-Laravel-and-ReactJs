import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

import './Main.css'

import api from '../services/api';

export default function Main({ match }) {
    const [doctors, setDoctors] = useState([])
    const [specialties, setSpecialties] = useState([])
    const [specialty, setSpecialty] = useState([])
    const [crm, setCrm] = useState([])
    const [name, setName] = useState([])


    useEffect( () => {
        async function loadDoctors() {
            const response = await api.get('/doctor', {
            })

            setDoctors(response.data.doctors)
        }
        async function loadSpecialties() {
            const response = await api.get('/specialties', {
            })
            setSpecialties(response.data)
        }

        loadSpecialties()
        loadDoctors()
        setName('')
        setCrm('')
        setSpecialty('')
        setName('')
    }, [match.params.id])
    async function hadleFilter(event) {
        event.preventDefault()
        const body = {
            name,
            crm,
            specialty,
        }
        const response = await api.post(`/search`, body)
        setDoctors(response.data)
    }
    return (

        <div className="main-container">

           <div className="row">
                <div className="col-md-3 nav-lateral">
                    <h4>
                      <b>Filtros</b>
                    </h4>
                    <hr />
                    <form onSubmit={hadleFilter}>
                    <div className="row">
                        <div className="form-group">
                            <label  className="col-sm-12 col-form-label"> NOME</label>
                            <div className="col-sm-12">
                                <input type="text" name="name" id="name" placeholder="Dr(a). "
                                className="form-control " value={name} onChange={e => setName(e.target.value)}  />
                            </div>
                        </div>
                        <div className="form-group">
                            <label  className="col-sm-12 col-form-label"> CRM</label>
                            <div className="col-sm-12">
                                <input type="text" name="crm" id="crm" className="form-control  "  value={crm} onChange={e => setCrm(e.target.value)}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label  className="col-sm-12 col-form-label">ESPECIALIDADE</label>
                            <div className="col-sm-12">
                                <select name="specialty"
                                onChange={e => setSpecialty(e.target.value)}
                                id="specialty" className="form-control" data-live-search="true" >
                                    <option value=""> Selecione uma especialidade</option>
                                  {specialties.map(specialty => (
                                    <option key={specialty.id} value={specialty.id}>{specialty.specialty} </option>
                                  ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-12 button">
                            <button className="btn btn-primary" type="submit" >BUSCAR</button>
                        </div>
                        </div>
                    </form>
                </div>
                <div className="col-md-9">
                { doctors.length > 0 ? (
                <ul>
                {doctors.map(doctor => (
                    <li key={doctor.id}>
                        <img src={(doctor.user.avatar) ?  doctor.user.avatar : "https://myblue.bluecrossma.com/sites/g/files/csphws1461/files/inline-images/Doctor%20Image%20Desktop.png"} alt={doctor.user.name}/>
                        <footer>
                            <strong>{doctor.user.name}</strong>
                            <p>{doctor.user.phone}</p>
                                <div className="button">
                                <Link to={`/edit/${doctor.id}`}>
                                    <button className="btn btn-sm  btn-success" type="submit" >Editar</button>
                                    </Link>
                                <Link to={`/show/${doctor.id}`}>
                                    <button className="btn btn-sm  btn-primary" type="submit" >Visualizar</button>
                                </Link>
                                </div>
                        </footer>
                        </li>
                    ))}
                </ul>
            ) : (
            <div className="empty">Nenhum médico encontrado!</div>
            )}
                </div>
           </div>
        </div>
    )
}

import React from 'react';
import { Link } from "react-router-dom";

// import { Container } from './styles';

export default function Header() {
  return (
    <nav className="container navbar navbar-expand-lg navbar-light navbar-laravel">
    <div className="">
        <Link className="navbar-brand" to="/">
            Good Doctor
        </Link>

    </div>
    <div className="navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <Link className="nav-link" to="/create">Novo Médico <span className="sr-only">(current)</span></Link>
      </li>
     
    </ul>
  </div>
</nav>
  );
}

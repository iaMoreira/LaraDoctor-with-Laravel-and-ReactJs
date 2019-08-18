import React, { Component } from "react";
import { Link } from "react-router-dom";

class Main extends Component {
    constructor(props) {
        super();
        this.state = {};
    }
    render() {
        return (
            <div className="align-content-center">
                <h1>Bem vindo ao Good Doctor</h1>
                <Link to="/doctor">
                    <h2>Ver lista de médicos </h2>
                </Link>
            </div>
        );
    }
}

export default Main;

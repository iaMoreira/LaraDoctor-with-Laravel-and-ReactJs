import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

// import Login from './pages/Login.js'
import Main from "./pages/Main.js";

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Main} />
            <Route path="/doctor/" component={List} />
            {/* <Route path="/doctor/create" component={Create} /> */}
            {/* <Route path="/doctor/edit" component={Edit} /> */}
        </BrowserRouter>
    );
}

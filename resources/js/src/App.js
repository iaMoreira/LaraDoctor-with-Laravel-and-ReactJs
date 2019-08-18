import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./pages/Header";
// import Main from "./pages/Main.js";
// import List from "./pages/List";
import Edit from "./pages/Edit";
import Create from "./pages/Create.js";
class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        {/* <Route path="/" exact component={Main} /> */}
                        {/* <Route path="/doctor/" component={List} /> */}
                        <Route path="/create" component={Create} />
                        <Route path="/edit" component={Edit} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));

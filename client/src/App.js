import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddOwner from "./components/add-owner.component";
import Owner from "./components/owner.component";
import OwnersList from "./components/owner-list.component";

function App() {
  return (
    <React.Fragment>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/homeowner" className="navbar-brand">
            ttttttttttttt
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/homeowner"} className="nav-link">
                Owners
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Switch>
              <Route exact path={["/", "/homeowner"]} component={OwnersList} />
              <Route exact path="/add" component={AddOwner} />
              <Route path="/homeowner/:id" component={Owner} />
            </Switch>
          </Switch>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;

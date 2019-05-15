//App.js

import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import Plan from "./Plan";
import Today from "./Today";
import Information from "./Information";
import Icon from "./Icon";
import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/js/bootstrap.min.js';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <a class="navbar-brand" href="#">
            <Icon />
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon" />
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <li class="nav-item">
                <a><Link to={'/'} className="nav-link"> Home  </Link></a>
                </li>
                <li class="nav-item">
                  <a><Link to={'/today'} className="nav-link">Ride Times Today  </Link></a>
                </li>
                <li class="nav-item">
                <a><Link to={'/plan'} className="nav-link">Plan Your Trip   </Link></a>
                </li>
              </ul>
            </div>
          </nav>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/information" component={Information} />
            <Route path="/plan" component={Plan} />
            <Route path="/today" component={Today} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

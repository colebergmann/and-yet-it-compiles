//App.js

import React, { Component } from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Plan from './Plan';
import Today from './Today';
import Information from './Information';
import Icon from "./Icon";


class App extends Component {
  render() {
    return (
    <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <a><Link to={'/information'} className="nav-link"> <Icon /> </Link></a> 
            <a><Link to={'/'} className="nav-link"> Home  </Link></a>  
            <a><Link to={'/today'} className="nav-link">Ride Times Today  </Link></a>
            <a><Link to={'/plan'} className="nav-link">Plan Your Trip   </Link></a>
          </ul>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/information' component={Information} />
              <Route path='/plan' component={Plan} />
              <Route path='/today' component={Today} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

//App.js

import React, { Component } from 'react';
import Footer from "./Footer"
import Header from "./Header"
import List from "./List"
import InputBox from "./InputBox"
import CheckBox from "./CheckBox"
import ContactCard from "./ContactCard"
import RideForm from "./RideForm"
import Chart from "./Chart"
import BarGraph from "./BarGraph"
import Logo from "./Logo"
import Icon from "./Icon"
import TodayButton from "./TodayButton"
import PlanButton from "./PlanButton"
import MyComponent from "./MyComponent"
import BasicExample from "./BasicExample"
import NavBar from "./NavBarLinks"


import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import Plan from './Plan';
import Today from './Today';
import Information from './Information';

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

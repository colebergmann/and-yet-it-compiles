import Logo from './Logo'
import Chart from './Chart'
import PlanGraph from './PlanGraph'
import Footer from './Footer'
import RideForm from './RideForm'
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/plan">Plan Your Trip</Link>
          </li>
          <li>
            <Link to="/today">Ride Times Today</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/plan" component={Plan} />
        <Route path="/today" component={Today} />
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <Chart />
      <Footer />
    </div>
  );
}

function Plan() {
  return (
    <div>
      <h2>The crowds for the next 30 days</h2>
      <PlanGraph />
    </div>
  );
}

function Today() {
  return (
    <div>
      <h2>Ride Wait Times</h2>
      <RideForm />
      <Chart />
    </div>
  );
}

export default BasicExample;


import Logo from './Logo'
import Chart from './Chart'
import RideForm from './RideForm'
import Footer from './Footer'
import React, { Component } from 'react';

class Today extends Component {
	render() {
  return (
    <div>
      <h2 className = "head">Pick a ride to see the predictive wait times through the next 12 hours!</h2>
      <RideForm />
      <Chart />
      <Footer />
    </div>
  );
}
}

export default Today;
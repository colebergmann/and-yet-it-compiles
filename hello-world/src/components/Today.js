import Chart from './Chart'
import RideForm from './RideForm'
import Footer from './Footer'
import React, { Component } from 'react';

class Today extends Component {
	render() {
  return (
    <div>
    	<span class = "welc" >Today's Ride Times</span>
      <h2 className = "paragraph">Pick a ride to see the predictive wait times through the next 12 hours!</h2>
      <RideForm />
      <Chart />
      <Footer />
    </div>
  );
}
}

export default Today;
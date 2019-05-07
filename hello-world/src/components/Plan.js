import React, { Component } from 'react';
import PlanGraph from './PlanGraph'
import Logo from './Logo'
import Footer from './Footer'

class Plan extends Component {
	render() {
  return (
    <div>
      <h2 className = "head">Not sure what day to go to the Happiest Place on Earth?
      Let us help! 
      </h2>
      <h4 className = "paragraph"> The crowds for the next 30 days are shown below: </h4>
      <PlanGraph />
      <Footer />
    </div>
  );
}
}

export default Plan;
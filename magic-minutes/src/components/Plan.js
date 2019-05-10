import React, { Component } from 'react';
import PlanGraph from './PlanGraph'
import Footer from './Footer'
import PlanInfo from './PlanInfo'

class Plan extends Component {
	render() {
  return (
    <div>
      <span className = "welc"> Planning your Trip to Disneyland!</span>
      <PlanInfo />
      <PlanGraph />
      <Footer />
    </div>
  );
}
}

export default Plan;
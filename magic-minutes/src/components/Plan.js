import React, { Component } from 'react';
import PlanGraph from './PlanGraph'
import Footer from './Footer'
import PlanInfo from './PlanInfo'
import castle from './castle.jpg'

class Plan extends Component {
	render() {
  return (
    <div>
      <span className = "welc"> Planning your Trip to Disneyland!</span>
      <div class="pic-container">
		<img class="disneypic" src={castle} alt="" height={400} width={800}></img>
	 	</div>
      <PlanInfo />
      <PlanGraph />
      <Footer />
    </div>
  );
}
}

export default Plan;
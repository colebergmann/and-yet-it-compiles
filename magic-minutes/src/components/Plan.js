import React, { Component } from 'react';
import PlanGraph from './PlanGraph'
import Footer from './Footer'
//import subFooter from './subFooter'
import PlanInfo from './PlanInfo'
import castle from './castle.jpg'

class Plan extends Component {
	render() {
  return (
    <div>
      <span className = "welc"> Planning your Trip to Disneyland</span>
      <div class="pic-container">
		      <img class="disneypic" src={castle} alt="" height={400} width={800}></img>
	 	   </div>
      <PlanInfo />
      <PlanGraph />
      <footer>
            <span className = "subfoot">i am the footer</span>
            <Footer />
        </footer> 
    </div>
  );
}
}

export default Plan;
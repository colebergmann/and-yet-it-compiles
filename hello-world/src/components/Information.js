//Info Page

import Logo from './Logo'
import PopulationChart from './PopulationChart'
import Footer from './Footer'
import React, { Component } from 'react';

class Information extends Component {
	render() {
  return (
    <div>
    	<main>
    		<a><h2 className = "info"> A little about our site ..</h2></a>
    		<a><h3 className = "paragraph"> Disneyland Parks in Anaheim, California attracts over 
    		44,000 visitors per day. Each visitor arrives at Disneyland with the risk of waiting in 
    		line for multiple hours per attraction. Unnecessary stress is imposed upon visitors when 
    		waiting in excruciatingly long lines and being surrounded by thousands of people. We 
    		believe there should be a way to predict wait times and crowd sizes within each park. 
    		Through the prediction of wait times per ride at Disneyland, visitors will enjoy a more 
    		efficient day at Disneyland parks. Thus, making the happiness place on earth even happier.</h3></a>
    	</main>
    	<body>
    		<a><h4 className ="foot"> Thanks for Visiting! </h4></a>
    		<Logo />
      	</body>
    </div>
  );
}
}

export default Information;
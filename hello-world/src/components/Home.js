import Logo from './Logo'
import PopulationChart from './PopulationChart'
import Footer from './Footer'
import React, { Component } from 'react';

class Home extends Component {
	render() {
  return (
    <div>
    	<main>
    		<a><h2 className = "welc"> Welcome to </h2></a>
    		<a><Logo /></a>
    	</main>
    	<body>
      		<PopulationChart />
      		<Footer />
      	</body>
    </div>
  );
}
}

export default Home;
import Logo from './Logo'
import PopulationChart from './PopulationChart'
import Footer from './Footer'
import React, { Component } from 'react';

class Home extends Component {
	render() {
  return (
    <div>
    	<main>
    		<a><h2 className = "welc"> Welcome to Magic Minutes!</h2></a>
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
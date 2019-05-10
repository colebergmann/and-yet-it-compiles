import PopulationChart from './PopulationChart'
import Footer from './Footer'
import HomeInfo from './HomeInfo'
import React, { Component } from 'react';

class Home extends Component {
	render() {
  return (
    <div>
    	<main>
    		<span class = "welc" >Welcome to Magic Minutes</span>
        <HomeInfo />
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
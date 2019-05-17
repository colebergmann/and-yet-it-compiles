import PopulationChart from './PopulationChart'
import Footer from './Footer'
//import subFooter from './subFooter'
import HomeInfo from './HomeInfo'
import React, { Component } from 'react';
import disneylandcur from './disneylandcur.jpg';

class Home extends Component {
	render() {
  return (
    <div>
    	<main>
    		<span class = "welc" >Welcome to Magic Minutes</span>
        <div class="pic-container">
					<img class="disneypic" src={disneylandcur} alt="" height={400} width={800}></img>
				</div>
        <HomeInfo />
    	</main>
    	<body>
      		<PopulationChart />
      	</body>
        <footer>
            <span className = "subfoot">i am the footer</span>
            <Footer />
        </footer> 
    </div>
  );
}
}

export default Home;
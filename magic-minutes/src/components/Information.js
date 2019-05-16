//Info Page
import React, { Component } from 'react';
import Logo from './Logo';
import Footer from './Footer'
import outline from './outline.jpg'

class Information extends Component {
	render() {
  return (
    <div>
    	<main>
    		<a><h2 className = "welc"> A little about our site . . .</h2></a>
            <div class="pic-container">
                <img class="disneypic" src={outline} height={300} width={200}></img>
            </div>
    		<a><h3 className = "paragraph"> Disneyland Parks in Anaheim, California attracts on average over 
    		44,000 visitors per day. Each visitor arrives at Disneyland with the risk of waiting in 
    		line for multiple hours per attraction. Unnecessary stress is imposed upon visitors when 
    		waiting in excruciatingly long lines and being surrounded by thousands of people. We 
    		believe there should be a way to predict wait times and crowd sizes within each park. 
    		Through the prediction of wait times per ride at Disneyland, visitors will enjoy a more 
    		efficient day at Disneyland parks. Thus, making the happiest place on earth even happier.</h3></a>
    	</main>
    	<body>
    		<a><h4 className ="visit"> Thanks for Visiting! </h4></a>
    		<Logo />
      	</body>
        <footer>
            <span className = "bottom"> Created By: Denver Simmons, Ryan Mitchell, 
            Olivia Clough, Cole Bergmann, and Abby Wysopal</span>
            <Footer />
        </footer>  
    </div>
  );
}
}

export default Information;
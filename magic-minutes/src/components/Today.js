import WaitTime from './WaitTime'
import React, { Component } from 'react';
import Footer from './Footer'
//import subFooter from './subFooter'
import california from './california.jpg'

class Today extends Component {

  render() {
  return (
    <div>
    	<span class = "welc" >Today's Ride Times</span>
    	<div class="pic-container">
			<img class="disneypic" src={california} alt="" height={400} width={800}></img>
	 	</div>
	 	<h2 className = "paragraph">Don't want to spend your day waiting in lines? 
	 	Use our Ride Times tool below to see predictive wait times for rides throughout
	 	the park! Simply pick your favorite ride and check the displayed wait times 
	 	shown during park hours to choose the best time to hop on. Make the most
	 	of your visit!</h2>
    	<WaitTime />
    <footer>
            <span className = "subfoot">i am the footer</span>
            <Footer />
        </footer>  
    </div>
  );
  }

}

export default Today;

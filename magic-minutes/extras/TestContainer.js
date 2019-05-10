/*TestContainer.js */

import React, {Component} from "react"
import Chart from './Chart'
import {Bar, Line, Pie} from "react-chartjs-2"


/*export const dayLabels = ["1pm", "2pm", "3pm", "4pm", "5pm", "6", "7", "8", "9", "10", "11", "12"];*/

export default class Test extends Component{
	constructor(props) {
	    super(props);
	    this.state = {
	      error: null,
	      isLoaded: false,
	      items: []
	    };
	  }

	  componentDidMount() {
	    fetch("http://colebergmann.com:5000/callPred/0")
	      .then(res => res.json())
	      .then(
	        (result) => {
	          this.setState({
	            isLoaded: true,
	            items: result
	          });
	        },
	        // Note: it's important to handle errors here
	        // instead of a catch() block so that we don't swallow
	        // exceptions from actual bugs in components.
	        (error) => {
	          this.setState({
	            isLoaded: true,
	            error
	          });
	        }
	      )
	  }

	  render() {
	    const { error, isLoaded, items } = this.state;
	    if (error) {
	      return <div>Error: {error.message}</div>;
	    }
	    else if (!isLoaded) {
	      return <div>Loading...</div>;
	    } else {
	      return (
	      	<div>
	      	<ul>
	      	Data: {items}
	      	</ul>
	      	</div>
	      );
	    }
	  }
}
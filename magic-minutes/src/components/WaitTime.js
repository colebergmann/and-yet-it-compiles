/*WaitTime.js*/
//import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import React, {Component} from "react"
import {Line} from "react-chartjs-2"
import 'bootstrap/dist/css/bootstrap.css';

class WaitTime extends Component{

	constructor(props){
		fetch("http://colebergmann.com:5000/callPred/0")
	      .then(res => res.json())
	      .then(
	        (result) => {
	          this.setState({
				value: "0",
				name: "Star Tours – The Adventures Continue",
	            isLoaded: true,
	            items: result,
	            chartData:{
	            	labels:
	            	["8am", " "," ","8:30am"," "," ",
	            	"9am", " "," ","9:30am"," "," ",
	            	"10am", " "," ","10:30am"," "," ",
	            	"11am", " "," ","11:30am"," "," ",
	            	"12pm", " "," ","12:30pm"," "," ",
					"1pm", " "," ","1:30pm"," "," ",
	            	"2pm", " "," ","2:30pm"," "," ",
	            	"3pm", " "," ","3:30pm"," "," ",
	            	"4pm", " "," ","4:30pm"," "," ",
	            	"5pm", " "," ","5:30pm"," "," ",
	            	"6pm", " "," ","6:30pm"," "," ",
	            	"7pm", " "," ","7:30pm"," "," ",
					"8pm", " "," ","8:30pm"," "," ",
	            	"9pm", " "," ","9:30pm"," "," ",
	            	"10pm", " "," ","10:30pm"," "," "],
	            	datasets:[
	            		{
	            			data: result,
							backgroundColor: 'rgba(83, 158, 205, .75)',
	      					borderColor: 'rgba(83, 158, 205, 1)',
	      					pointBorderWidth: 1,
      						pointRadius: 1,
      						pointHitRadius: 10
						}
	            	],
	            },
	            chartOptions:{

						title: {
							text: "Wait Times ",
							display:true,
							fontSize:25,
							fontColor: 'black'
						},
						legend:{
							display: false,
							position: 'right'
						},
						scales: {
            				yAxes: [{
            					scaleLabel:{
            						display: true,
            						labelString: "Minutes",
            						fontColor: 'black',
            						fontSize: 15,
            						fontFamily: 'Cabin'
            					},         						
                				ticks: {

                    				beginAtZero: true,
                    				fontColor: 'black'
				                }
				            }],
				            xAxes: [{
				            	scaleLabel:{
            						display: true,
            						labelString: "Time",
            						fontColor: 'black',
            						fontSize: 15,
            						fontFamily: 'Cabin'
            					},
				            	ticks:{
				            		fontColor: 'black',
				            	}
				            }],

				        }
				}
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
		super(props);
		this.state = {
			value: "0",
			name: "Star Tours – The Adventures Continue",
			error: null,
	      	isLoaded: false,
	      	items: [],
			chartData:{
			labels: [],
				datasets: [
					{
						backgroundColor: 'rgba(83, 158, 205, .75)',
      					borderColor: 'rgba(83, 158, 205, 1)',
					}
				]
			}
		}
		this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
	}

  	handleChange(event) {
    	this.setState({value: event.target.value});
  	}

	handleSubmit(event) {
		event.preventDefault();
    	fetch("http://colebergmann.com:5000/callPred/"+this.state.value)
	      .then(res => res.json())
	      .then(
	        (result) => {
	          this.setState({
	            isLoaded: true,
	            items: result,
	            chartData:{
	            	labels:
	            	["8", " "," ","8:30"," "," ",
	            	"9", " "," ","9:30"," "," ",
	            	"10", " "," ","10:30"," "," ",
	            	"11", " "," ","11:30"," "," ",
	            	"12", " "," ","12:30"," "," ",
					"1", " "," ","1:30"," "," ",
	            	"2", " "," ","2:30"," "," ",
	            	"3", " "," ","3:30"," "," ",
	            	"4", " "," ","4:30"," "," ",
	            	"5", " "," ","5:30"," "," ",
	            	"6", " "," ","6:30"," "," ",
	            	"7", " "," ","7:30"," "," ",
					"8", " "," ","8:30"," "," ",
	            	"9", " "," ","9:30"," "," ",
	            	"10", " "," ","10:30"," "," "],
	            	datasets:[
	            		{
	            			data: result,
							backgroundColor: 'rgba(83, 158, 205, .75)',
	      					borderColor: 'rgba(83, 158, 205, 1)',
							pointBorderWidth: 1,
      						pointRadius: 1,
      						pointHitRadius: 10
	            		}
	            	]

	            },
	            chartOptions:{
						title: {
							text: "Wait Times ",
							display:true,
							fontSize:25,
							fontColor: 'black'
						},
						legend:{
							display: false,
							position: 'right'
						},
						scales: {
            				yAxes: [{

            					scaleLabel:{
            						display: true,
            						labelString: "Minutes",
            						fontColor: 'black',
            						fontSize: 15,
            						fontFamily: 'Cabin'
            					},         						
                				ticks: {
                    				beginAtZero: true,

                    				fontColor: 'black'
				                }
				            }],
				            xAxes: [{
				            	scaleLabel:{
            						display: true,
            						labelString: "Time",
            						fontColor: 'black',
            						fontSize: 15,
            						fontFamily: 'Cabin'
            					},
				            	ticks:{
				            		fontColor: 'black',
				            	}
				            }],

				        }
				}
	          });
	        },
	        (error) => {
	          this.setState({
	            isLoaded: true,
	            error
	          });
	        }
	      )
  	}


	render(){
			const { error, isLoaded} = this.state;
	    	if (error) {
		    	return <div>Error: {error.message}</div>;
		    }
	    	else if (!isLoaded) {
	      		return <div>Loading...</div>;
	    	} else {
	      		return (
	      			<div>
	      				<form onSubmit={this.handleSubmit}>
			        	<label>
			        			<h2 class="paragraph2" > Pick your ride: </h2>
					          	<select value={this.state.value} onChange={this.handleChange}>
					            <option value="0">Star Tours – The Adventures Continue</option>
					            <option value="1">it’s a small world</option>
					            <option value="2">Pirates of the Caribbean</option>
					            <option value="3">Big Thunder Mountain Railroad</option>
					            <option value="4">Indiana Jones™ Adventure</option>
					            <option value="5">Matterhorn Bobsleds</option>
					            <option value="6">Space Mountain</option>
					            <option value="7">Haunted Mansion</option>
					            <option value="8">Splash Mountain</option>
			          		</select>
			        	</label>
			        <input type="submit" value="Submit" />
			      </form>

			<div className = "chart">
				<Line
					data={this.state.chartData}
					options={this.state.chartOptions}
				/>
			</div>
			</div>
		);
	}
}
}


export default WaitTime
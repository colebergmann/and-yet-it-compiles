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
	            isLoaded: true,
	            items: result,
	            chartData:{
	            	labels:
	            	["8", "8:10","8:20","8:30","8:40","8:50",
	            	"9", "9:10","9:20","9:30","9:40","9:50",
	            	"10", "10:10","10:20","10:30","10:40","10:50",
	            	"11", "11:10","11:20","11:30","11:40","11:50",
	            	"12", "12:10","12:20","12:30","12:40","12:50",
					"1", "1:10","1:20","1:30","1:40","1:50",
	            	"2", "2:10","2:20","2:30","2:40","2:50",
	            	"3", "3:10","3:20","3:30","3:40","3:50",
	            	"4", "4:10","4:20","4:30","4:40","4:50",
	            	"5", "5:10","5:20","5:30","5:40","5:50",
	            	"6", "6:10","6:20","6:30","6:40","6:50",
	            	"7", "7:10","7:20","7:30","7:40","7:50",
					"8", "8:10","8:20","8:30","8:40","8:50",
	            	"9", "9:10","9:20","9:30","9:40","9:50",
	            	"10", "10:10","10:20","10:30","10:40","10:50"],
	            	datasets:[
	            		{
	            			data: result,
							backgroundColor: 'rgba(83, 158, 205, .75)',
	      					borderColor: 'rgba(83, 158, 205, 1)',
						}
	            	],
	            },
	            	            chartOptions:{
						title: {
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
            						labelString: "minutes",
            						fontColor: 'black'
            					},         						
                				ticks: {
                    				beginAtZero: true,
                    				fontColor: 'black'
				                }
				            }],
				            xAxes: [{

				            	ticks:{
				            		callback: function(value, index, values) {
				            			if(index < 24){
				            				return value + 'am';
				            			}else{
			                        		return value + 'pm';
				            			}

			                    	},
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
	            	labels:["8", "8:10","8:20","8:30","8:40","8:50",
	            	"9", "9:10","9:20","9:30","9:40","9:50",
	            	"10", "10:10","10:20","10:30","10:40","10:50",
	            	"11", "11:10","11:20","11:30","11:40","11:50",
	            	"12", "12:10","12:20","12:30","12:40","12:50",
					"1", "1:10","1:20","1:30","1:40","1:50",
	            	"2", "2:10","2:20","2:30","2:40","2:50",
	            	"3", "3:10","3:20","3:30","3:40","3:50",
	            	"4", "4:10","4:20","4:30","4:40","4:50",
	            	"5", "5:10","5:20","5:30","5:40","5:50",
	            	"6", "6:10","6:20","6:30","6:40","6:50",
	            	"7", "7:10","7:20","7:30","7:40","7:50",
					"8", "8:10","8:20","8:30","8:40","8:50",
	            	"9", "9:10","9:20","9:30","9:40","9:50",
	            	"10", "10:10","10:20","10:30","10:40","10:50"],
	            	datasets:[
	            		{
	            			data: result,
							backgroundColor: 'rgba(83, 158, 205, .75)',
	      					borderColor: 'rgba(83, 158, 205, 1)',
							
	            		}
	            	]

	            },
	            chartOptions:{
						title: {
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
            						labelString: "minutes",
            						fontColor: 'black'
            					},         						
                				ticks: {
                    				beginAtZero: true,
                    				fontColor: 'black'
				                }
				            }],
				            xAxes: [{

				            	ticks:{
				            		callback: function(value, index, values) {
				            			if(index < 24){
				            				return value + 'am';
				            			}else{
			                        		return value + 'pm';
				            			}

			                    	},
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
import React, {Component} from "react"
import {Line} from "react-chartjs-2"


class PlanGraph extends Component{
	constructor(props){
		fetch("http://colebergmann.com:5000/callPred/10")
	      .then(res => res.json())
	      .then(
	        (result) => {
	          this.setState({
	            isLoaded: true,
	            items: result,
	            chartData:{
					labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
					"11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
					"21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
	            	datasets:[
	            		{
	            			data: result,
							label:'Predicted Park Crowds', 
      						backgroundColor: 'rgba(0, 25, 137, .65)',
      						borderColor: 'rgba(0, 25, 137, 1)',
      						pointBorderWidth: 1,
      						pointRadius: 1,
      						pointHitRadius: 10
	            		}
	            	],
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
			error: null,
	      	isLoaded: false,
	      	items: [],
			chartData:{
			labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
					"11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
					"21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
				datasets: [
					{
						data: [],
						label:'Predicted Park Crowds', 
						backgroundColor: 'rgba(83, 158, 205, .75)',
      					borderColor: 'rgba(83, 158, 205, 1)',
					}
				]
			}
		}
	}

	render(){
		return(
			<div className = "chart">
				<Line
					data={this.state.chartData}
					options={{
						title: {
							display:true,
							text:"Predicted Park Crowds",
							fontFamily: 'Cabin',
							fontColor: 'black',
							fontSize:30
						},
						legend:{
							display: false,
							position: 'right'
						},
						scales: {
            				yAxes: [{
            					scaleLabel: {
            						display: true,
            						labelString: 'Anticipated Crowds',
            						fontSize: 15,
            						fontFamily: 'Cabin'
            					},
                				ticks: {
                    				beginAtZero: true
				                }
				            }],
				            xAxes: [{
				            	scaleLabel: {
				            		display:true,
				            		labelString: 'Days in the future',
				            		fontSize: 15,
				            		fontFamily: 'Cabin'
				            	}
				            }]

				        }
					}}
				/>
			</div>
		);
	}
}


export default PlanGraph
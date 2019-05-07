//Chart.js

import React, {Component} from "react"
import {Bar, Line, Pie} from "react-chartjs-2"
import { popuData, dayLabels } from "./FakePlanGraph";

/* Title function header*/
class PlanGraph extends Component{
	constructor(props){
		super(props);
		this.state = {
			chartData:{
				labels: dayLabels,
				datasets: [
					{
						label:'Predicted Park Crowds',
						data: popuData,
						borderColor: 'rgba(77, 112, 255, 1)',
						backgroundColor: 'rgba(77, 112, 255, 1)'
					}
				]
			}
		}

		/*function componentWillMount() {
			this.getChartData();
		}

		function getChartData(){
			$.getJSON("https://colebergmann.com/api").then(results => {
				this.setState({data: results.popuData})
			});
		}*/
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
							fontSize:25
						},
						legend:{
							display: true,
							position: 'right'
						},
						scales: {
            				yAxes: [{
            					scaleLabel: {
            						display: true,
            						labelString: 'Anticipated Crowds'
            					},
                				ticks: {
                    				beginAtZero: true
				                }
				            }],
				            xAxes: [{
				            	scaleLabel: {
				            		display:true,
				            		labelString: 'Days in the future'
				            	}
				            }]

				        }
					}}
				/>
			</div>
		)
	}
}


export default PlanGraph
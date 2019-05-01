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
						data:popuData,
						borderColor: 'rgba(63, 63, 191, 1)',
						backgroundColor: 'rgba(63, 63, 191, 1)'
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
							fontSize:25
						},
						legend:{
							display: true,
							position: 'right'
						},
						scales: {
            				yAxes: [{
                				ticks: {
                    				beginAtZero: true
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
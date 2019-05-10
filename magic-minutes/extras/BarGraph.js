//Chart.js

import React, {Component} from "react"
import {Bar, Line, Pie} from "react-chartjs-2"
import { popData, yearLabels } from "./DataGraph";

/* Title function header*/
class BarGraph extends Component{

	constructor(props){
		super(props);
		this.state = {
			chartData:{
				labels: yearLabels,
				datasets: [
					{
						
						data: popData,
						backgroundColor: [
						'rgba(255, 99, 132, .6)',
						'rgba(52, 162, 235, .6)',
						'rgba(255, 206, 86, .6)',
						'rgba(52, 162, 235, .6)',
						'rgba(152, 162, 132, .6)',
						'rgba(222, 200, 235, .6)',
						'rgba(182, 162, 85, .6)',
						'rgba(82, 92, 100, .6)',
						'rgba(52, 190, 62, .6)',
						'rgba(134, 77, 200, .6)',
						'rgba(66, 190, 240, .6)',
						'rgba(240, 132, 58, .6)'
						]
					}
				]
			}
		}
	}
	render(){
		return(
			<div className = "chart">
				<Bar
					data={this.state.chartData}
					options={{
						title: {
							display:true,
							text:"Disneyland Park Population",
							fontSize:25
						},
						legend:{
							display: true,
							position: 'right'
						}
					}}
				/>
			</div>
		)
	}
}

export default BarGraph

//Chart.js

import React, {Component} from "react"
import {Bar, Line, Pie} from "react-chartjs-2"
import { popData, yearLabels } from "./DataGraph";

/* Title function header*/
class PopulationChart extends Component{

	constructor(props){
		super(props);
		this.state = {
			chartData:{
				labels: yearLabels,
				datasets: [
					{
						label:'Park Population',
						//data:[46.06451613,44.5,47.23333333,48.36666667,52.06451613,50.79310345,49.83333333,46.76666667,42.79310345,56.03333333,46.65517241,42.96153846],
						data:popData,
						borderColor: 'rgba(255, 206, 86, .6)',
						backgroundColor: 'rgba(255, 206, 86, .6)'
						// [
						// 'rgba(255, 99, 132, .6)','rgba(255, 99, 132, .6)','rgba(255, 99, 132, .6)',
						// 'rgba(52, 162, 235, .6)','rgba(52, 162, 235, .6)','rgba(52, 162, 235, .6)',
						// 'rgba(255, 206, 86, .6)','rgba(255, 206, 86, .6)','rgba(255, 206, 86, .6)',
						// 'rgba(52, 162, 235, .6)','rgba(52, 162, 235, .6)','rgba(52, 162, 235, .6)',
						// 'rgba(152, 162, 132, .6)','rgba(152, 162, 132, .6)','rgba(152, 162, 132, .6)',
						// 'rgba(222, 200, 235, .6)','rgba(222, 200, 235, .6)','rgba(222, 200, 235, .6)',
						// 'rgba(182, 162, 85, .6)','rgba(182, 162, 85, .6)','rgba(182, 162, 85, .6)',
						// 'rgba(82, 92, 100, .6)','rgba(82, 92, 100, .6)','rgba(82, 92, 100, .6)',
						// 'rgba(52, 190, 62, .6)','rgba(52, 190, 62, .6)','rgba(52, 190, 62, .6)',
						// 'rgba(134, 77, 200, .6)','rgba(134, 77, 200, .6)','rgba(134, 77, 200, .6)',
						// 'rgba(66, 190, 240, .6)','rgba(66, 190, 240, .6)','rgba(66, 190, 240, .6)',
						// 'rgba(240, 132, 58, .6)','rgba(240, 132, 58, .6)','rgba(240, 132, 58, .6)'
						// ]
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
							text:"Disneyland Park Population",
							fontSize:25,
							fontColor: 'black'
						},
						legend:{
							display: true,
							position: 'right'
						},
						scales: {
            				yAxes: [{
                				ticks: {
                    				beginAtZero: true,
                    				fontColor: 'black'
				                }
				            }],
				            xAxes: [{
				            	ticks:{
				            		fontColor: 'black'
				            	}
				            }],

				        }
					}}
				/>
			</div>
		)
	}
}


export default PopulationChart

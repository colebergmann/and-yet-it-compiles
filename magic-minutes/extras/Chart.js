//Chart.js

import React, {Component} from "react"
import {Bar, Line, Pie} from "react-chartjs-2"
import TodayData from './TodayData';

/* Title function header*/
export default class Chart extends Component{

	constructor(props){
		super(props);
		this.state = {
			value: " ",
			chartData:{
				labels: ["1pm", "2pm", "3pm", "4pm", "5pm", "6", "7", "8", "9", "10", "11", "12"],
				datasets: [
					{
						label:'Wait Times',
						data: <TodayData id={this.props.id} />,
						borderColor: 'rgba(200, 150, 204, 1)',
						backgroundColor: 'rgba(200, 150, 204, 1)'
					}
				]
			}
		}
	}



	render(){
		return(
			<h1>{this.props.value}</h1>
			/*

			<div className = "chart">
				<Line
					data={this.state.chartData}
					options={{
						title: {
							display:true,
							text:"Disneyland Wait Time",
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
		*/
		)
	}
}




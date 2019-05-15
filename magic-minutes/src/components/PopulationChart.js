//Chart.js

import React, {Component} from "react"
import {Line} from "react-chartjs-2"
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
						data:popData,
						backgroundColor: 'rgba(83, 158, 205, .75)',
      					borderColor: 'rgba(83, 158, 205, 1)',
      					pointBorderWidth: 1,
      					pointRadius: 1,
      					pointHitRadius: 10
						
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
							fontSize:30,
							fontColor: 'black',
							fontFamily: 'Cabin'
						},
						legend:{
							display: false,
							position: 'right'
						},
						scales: {
            				yAxes: [{
            					scaleLabel: {
            						display: true,
            						labelString: 'Number of Visitors',
            						fontSize: 15,
            						fontColor: 'black',
            						fontFamily: 'Cabin'
            					},
                				ticks: {
                    				beginAtZero: true
				                }
				            }],
				            xAxes: [{
				            	scaleLabel: {
				            		display:true,
				            		labelString: '2018',
				            		fontSize: 15,
				            		fontColor: 'black',
				            		fontFamily: 'Cabin'
				            	}
				            }]

				        }
					}
				}
				/>
			</div>
		)
	}
}


export default PopulationChart

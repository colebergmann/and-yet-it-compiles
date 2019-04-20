//Chart.js

import React, {Component} from "react"
import {Bar, Line, Pie} from "react-chartjs-2"

/* Title function header*/
class Chart extends Component{

	constructor(props){
		super(props);
		this.state = {
			chartData:{
				labels: ['January','','','February','','','March','','','April','','','May','','','June','','','July','','','August','','','September','','','October','','','November','','','December'],
				datasets: [
					{
						label:'Park Population',
						//data:[46.06451613,44.5,47.23333333,48.36666667,52.06451613,50.79310345,49.83333333,46.76666667,42.79310345,56.03333333,46.65517241,42.96153846],
						data:[
						55.8,45.7,37.54545455,
						40.8,45.55555556,47.55555556,
						39.8,48.6,52.63636364,
						50.1,44.3,50.7,
						51.4,49.4,55.09090909,
						53,51.3,47.6,
						44.6,51.2,53.09090909,
						47.9,45.5,46,
						43,41.4,43.9,
						55.8,41.4,43.9,
						40.1,53.9,45.4,
						38.3,41.3,67.11111111
						],
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


export default Chart

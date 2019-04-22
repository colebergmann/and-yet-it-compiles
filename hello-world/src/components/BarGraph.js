//Chart.js

import React, {Component} from "react"
import {Bar, Line, Pie} from "react-chartjs-2"

/* Title function header*/
class BarGraph extends Component{

	constructor(props){
		super(props);
		this.state = {
			chartData:{
				labels: ['January','February','March','April','May','June','July','August','September','October','November','December'],
				datasets: [
					{
						label:'Park Population',
						data:[46.0645,44.5,47.89,48.367,52.065,51.286,50.276,46.451,43.286,55.065,47.286,50.222],
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

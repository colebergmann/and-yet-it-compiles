import React, {Component} from "react"
import {Bar, Line, Pie} from "react-chartjs-2"

/* Title function header*/
class LineGraph extends Component{

	constructor(props){
		super(props);
		this.state = {
			chartData:{
				labels: ['Boston','Springfield','Cambridge'],
				datasets: [
					{
						label:'Population',
						data:[1234567,765432,23456],
						backgroundColor: [
						'rgba(255, 99, 132, .6)',
						'rgba(52, 162, 235, .6)',
						'rgba(255, 206, 86, .6)'
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
							text:"Largest Cities in Massachusetts",
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

export default LineGraph

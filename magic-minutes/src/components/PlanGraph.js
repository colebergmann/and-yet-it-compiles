//Chart.js

import React, {Component} from "react"
import {Line} from "react-chartjs-2"
//import PlanGraphContainer from "./PlanGraphContainer"
//import { popuData, dayLabels } from "./FakePlanGraph";

class PlanGraphContainer extends Component {
  state = {
    dataToPass: []
  };

  async componentDidMount() {
    const response = await fetch('http://colebergmann.com:5000/callPred/0');
    const data = await response.json(); 
    this.setState({dataToPass: data});
  }

  render() {
    return <PlanGraph data={this.state.dataToPass} />
  }
}


class PlanGraph extends Component{
	constructor(props){
		super(props);
		this.state = {
			chartData:{
				labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
				datasets: [
					{
						label:'Predicted Park Crowds', 
						data: this.props.data,
						borderColor: 'rgba(77, 112, 255, 1)',
						backgroundColor: 'rgba(77, 112, 255, 1)'
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
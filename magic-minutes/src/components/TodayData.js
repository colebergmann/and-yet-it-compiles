//TodayData
import React, {Component} from "react"
import Chart from './Chart'
import {Bar, Line, Pie} from "react-chartjs-2"


/*export const dayLabels = ["1pm", "2pm", "3pm", "4pm", "5pm", "6", "7", "8", "9", "10", "11", "12"];*/

export default class TodayData extends Component{
	constructor(props){
		super(props);
		this.state = {
			id: 0,
			waitTimes: []
		};		
	}
	async componentDidMount(id) {

		if(id == 0){
			const response = await fetch('http://colebergmann.com:5000/callPred/0');
			const data = await response.json(); 
			this.setState({waitTimes: data});
		}
		/*
		else if(id == '1'){
			const response = await fetch('http://colebergmann.com:5000/callPred/1');
			const data = await response.json(); 
			this.setState({waitTimes: data});
		}
		else if(id == '2'){
			const response = await fetch('http://colebergmann.com:5000/callPred/2');
			const data = await response.json(); 
			this.setState({waitTimes: data});
		}else if(id == '3'){
			const response = await fetch('http://colebergmann.com:5000/callPred/3');
			const data = await response.json(); 
			this.setState({waitTimes: data});
		}else if(id == '4'){
			const response = await fetch('http://colebergmann.com:5000/callPred/4');
			const data = await response.json(); 
			this.setState({waitTimes: data});
		}else if(id == '5'){
			const response = await fetch('http://colebergmann.com:5000/callPred/5');
			const data = await response.json(); 
			this.setState({waitTimes: data});
		}else if(id == '6'){
			const response = await fetch('http://colebergmann.com:5000/callPred/6');
			const data = await response.json(); 
			this.setState({waitTimes: data});
		}else if(id == '7'){
			const response = await fetch('http://colebergmann.com:5000/callPred/7');
			const data = await response.json(); 
			this.setState({waitTimes: data});
		}else if(id == '8'){
			const response = await fetch('http://colebergmann.com:5000/callPred/8');
			const data = await response.json(); 
			this.setState({waitTimes: data});
		}else if(id == '9'){
			const response = await fetch('http://colebergmann.com:5000/callPred/9');
			const data = await response.json(); 
			this.setState({waitTimes: data});
		}
		*/

  	}

	render() {
    	return (
    		<div>
    		<Chart data={this.state.waitTimes} />
    		</div>
    		);
  	}

}
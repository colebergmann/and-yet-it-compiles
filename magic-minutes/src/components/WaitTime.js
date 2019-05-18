/*WaitTime.js*/
//import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import React, {Component} from "react"
import {Line, Chart} from "react-chartjs-2"
import 'bootstrap/dist/css/bootstrap.css';

Chart.pluginService.register({
  beforeDraw: function(chartInstance, easing) {
    var lineOpts = chartInstance.options.drawHorizontalLine;
    if (lineOpts) {

      var yAxis = chartInstance.scales["y-axis-0"];
      var yValueStart = yAxis.getPixelForValue(lineOpts.lineY[0], 0, 0, true);
      var yValueEnd = yAxis.getPixelForValue(lineOpts.lineY[1], 0, 0, true);

      var xAxis = chartInstance.scales["x-axis-0"];
      var xValueStart = xAxis.getPixelForTick(0);
      var xValueEnd = xAxis.right;

      console.log('xValueEnd', xValueEnd);
      console.log('yAxis.ticks.length', xAxis.ticks.length );
      console.log(yAxis.getPixelForTick(xAxis.ticks.length - 1));

      var ctx = chartInstance.chart.ctx;
      ctx.save();

      ctx.font = lineOpts.textFont;
      ctx.fillStyle = lineOpts.textColor;
      ctx.fillText(lineOpts.text, lineOpts.textPosition, yValueStart);

      ctx.setLineDash([10, 10]);
      ctx.strokeStyle = lineOpts.lineColor;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(yValueStart, (xValueStart - 20));
      ctx.lineTo(yValueEnd, (xValueEnd));
      ctx.stroke();

      ctx.restore();
    }
  }
});


class WaitTime extends Component{

	constructor(props){
		//fetch("http://colebergmann.com:5000/callPred/0")
		fetch("https://colebergmann.com:5000/graph/0")
	      .then(res => res.json())
	      .then(
	        (result) => {
	          this.setState({
				value: "0",
				name: "Star Tours – The Adventures Continue",
				lineIndex: result["predIndex"],
	            isLoaded: true,
	            items: result["array"],
	            chartData:{
	            	labels:
	            	["8am",  " ", " ", "8:30am", " "," ",
	            	 "9am",  " ", " ", "9:30am", " "," ",
	            	 "10am", " ", " ", "10:30am"," "," ",
	            	 "11am", " ", " ", "11:30am"," "," ",
	            	 "12pm", " ", " ", "12:30pm"," "," ",
					 "1pm",  " ", " ", "1:30pm", " "," ",
	            	 "2pm",  " ", " ", "2:30pm", " "," ",
	            	 "3pm",  " ", " ", "3:30pm", " "," ",
	            	 "4pm",  " ", " ", "4:30pm", " "," ",
	            	 "5pm",  " ", " ", "5:30pm", " "," ",
	            	 "6pm",  " ", " ", "6:30pm", " "," ",
	            	 "7pm",  " ", " ", "7:30pm", " "," ",
					 "8pm",  " ", " ", "8:30pm", " "," ",
	            	 "9pm",  " ", " ", "9:30pm", " "," ",
	            	 "10pm", " ", " ", "10:30pm"," "," "],
	            	datasets:[
	            		{
	            			data: result["array"],
							backgroundColor: 'rgba(83, 158, 205, .75)',
	      					borderColor: 'rgba(83, 158, 205, 1)',
	      					pointBorderWidth: 1,
      						pointRadius: 1,
      						pointHitRadius: 10
						}
	            	],
	            },
	            chartOptions:{
						drawHorizontalLine: {

							//(170,170) to (-245,-245)
							//8am = (172, 172)
							//8:10 = (167, 167)
							//8:20 = (162, 162)
							// x = 172 - (index * (5))
							// lineY: [x , x]
							//(0,0) = 1:30

						    
						    lineY: [172 - (result["predIndex"] * 5.25), 172 - (result["predIndex"] * 5.25)],

						    lineColor: "rgba(50, 155, 255, 0.85)",
						      // text: 'current time',
						      // textPosition: 10,
						    textFont: '18px sans-serif',
						    textColor: "rgba(50, 155, 255, 0.85)"
						    },
						title: {
							text: "Wait Times ",
	            			fontFamily: 'Cabin',
							display:true,
							fontSize:25,
							fontColor: 'black'
						},
						legend:{
							display: false,
							position: 'right'
						},
						scales: {
            				yAxes: [{
            					scaleLabel:{
            						display: true,
            						labelString: "Minutes",
            						fontColor: 'black',
            						fontSize: 15,
            						fontFamily: 'Cabin'
            					},         						
                				ticks: {

                    				beginAtZero: true,
                    				min: 0,
                    				max: 160,
                    				fontColor: 'black'
				                }
				            }],
				            xAxes: [{
				            	scaleLabel:{
            						display: true,
            						labelString: "Time",
            						fontColor: 'black',
            						fontSize: 15,
            						fontFamily: 'Cabin'
            					},
				            	ticks:{
				            		fontColor: 'black',
				            	}
				            }],

				        },
				        layout: {
				            padding: {
				                left: 0,
				                right: 0,
				                top: 40,
				                bottom: 0
				            }
			        	}
					}
	          	});
	        },
	        // Note: it's important to handle errors here
	        // instead of a catch() block so that we don't swallow
	        // exceptions from actual bugs in components.
	        (error) => {
	          this.setState({
	            isLoaded: true,
	            error
	          });
	        }
	      )
		super(props);
		this.state = {
			date: null,
			value: "0",
			name: "Star Tours – The Adventures Continue",
			error: null,
	      	isLoaded: false,
	      	items: [],
			chartData:{
			labels: [],
				datasets: [
					{
						backgroundColor: 'rgba(83, 158, 205, .75)',
      					borderColor: 'rgba(83, 158, 205, 1)',
					}
				]
			}
		}
		this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
	}
	

  	handleChange(event) {
    	this.setState({value: event.target.value});
  	}

	handleSubmit(event) {
		event.preventDefault();
    	//fetch("http://colebergmann.com:5000/callPred/"+this.state.value)
    	fetch("https://colebergmann.com:5000/graph/"+this.state.value)
	      .then(res => res.json())
	      .then(
	        (result) => {
	          this.setState({
	            isLoaded: true,
	            lineIndex: result["predIndex"],
	            items: result["array"],
	            chartData:{
	            	datasets:[
	            		{
	            			data: result["array"],
	            		}
	            	]
	            },
	          });
	        },
	        (error) => {
	          this.setState({
	            isLoaded: true,
	            error
	          });
	        }
	      )
  	}


	render(){
			const { error, isLoaded} = this.state;
	    	if (error) {
		    	return <div>Error: {error.message}</div>;
		    }
	    	else if (!isLoaded) {
	      		return <div>Loading...</div>;
	    	} else {
	      		return (
	      			<div>
								<div class="ride-form-wrapper">
									<form class="form-inline ride-form" onSubmit={this.handleSubmit}>
										<div class="form-group mx-sm-3 mb-2">
											<select class="form-control form-control-lg" value={this.state.value} onChange={this.handleChange}>
												<option value="0">Star Tours – The Adventures Continue</option>
												<option value="1">it’s a small world</option>
												<option value="2">Pirates of the Caribbean</option>
												<option value="3">Big Thunder Mountain Railroad</option>
												<option value="4">Jungle Cruise</option>
												<option value="5">Indiana Jones™ Adventure</option>
												<option value="6">Matterhorn Bobsleds</option>
												<option value="7">Space Mountain</option>
												<option value="8">Haunted Mansion</option>
												<option value="9">Splash Mountain</option>
											</select>
										</div>
										<button type="submit" class="btn btn-primary btn-lg mb-2">Submit</button>
										</form>
									</div>
			<div className = "chart">
				<Line
					data={this.state.chartData}
					options={this.state.chartOptions}
				/>
			</div>
			</div>
		);
	}
}
}


export default WaitTime
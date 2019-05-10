//Ride form with the beginning 5 rides as options to choose from 

import React from "react"
import Chart from './Chart';


class RideForm extends React.Component {
  constructor(props) {
    super(props);
    //beginning option (can be anything)
    this.state = {value: "Space Mountain"};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

//simply a pop up window to check the result
  handleSubmit(event) {
    if(event.target.value == 0){
      fetch("http://colebergmann.com:5000/callPred/0")
    }
    else if(event.target.value == '1'){
      fetch("http://colebergmann.com:5000/callPred/0")
    }
    else if(event.target.value == '2'){
      fetch("http://colebergmann.com:5000/callPred/0")
    }else if(event.target.value == '3'){
      fetch("http://colebergmann.com:5000/callPred/0")
    }



  }

//set up of the drop down 
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <h2 class="paragraph" > Pick your ride: </h2>
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="0">Space Mountain</option>
            <option value="1">Pirates of the Caribbean</option>
            <option value="2">Big Thunder Mountain Railroad</option>
            <option value="3">Haunted Mansion</option>
            <option value="4">Splash Mountain</option>
            <option value="5">Matterhorn Bobsleds</option>
            <option value="6™ Adventure">Indiana Jones™ Adventure</option>
            <option value="7">it’s a small world</option>
            <option value="8">Star Tours – The Adventures Continue</option>
            <option value="9">Jungle Cruise</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default RideForm
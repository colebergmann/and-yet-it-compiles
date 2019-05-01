//Ride form with the beginning 5 rides as options to choose from 

import React from "react"

class RideForm extends React.Component {
  constructor(props) {
    super(props);
    //beginning option (can be anything)
    this.state = {value: 'Space Mountain'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

//simply a pop up window to check the result
  handleSubmit(event) {
    alert('Your ride is: ' + this.state.value);
    event.preventDefault();
  }

//set up of the drop down 
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your ride:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="Pirates of the Caribbean">Pirates of the Caribbean</option>
            <option value="Big Thunder Mountain Railroad">Big Thunder Mountain Railroad</option>
            <option value="Haunted Mansion">Haunted Mansion</option>
            <option value="Space Mountain">Space Mountain</option>
            <option value="Splash Mountain">Splash Mountain</option>
            <option value="Matterhorn Bobsleds">Matterhorn Bobsleds</option>
            <option value="Indiana Jones™ Adventure">Splash Mountain</option>
            <option value="it’s a small world">it’s a small world</option>
            <option value="Star Tours – The Adventures Continue">Star Tours – The Adventures Continue</option>
            <option value="Jungle Cruise">Jungle Cruise</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default RideForm
//InputBox.js

import React from 'react';
//import { browserHistory } from 'react-router'

class InputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
//no where to lead right now, so it just gives a pop up that something was submitted for testing
  handleSubmit(event) {
    this.props.history.push('/Today')
    //alert('A date was submitted: ' + this.state.value);
    event.preventDefault();
  }
//labeling "date:" and accepting submits 
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Date:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default InputBox
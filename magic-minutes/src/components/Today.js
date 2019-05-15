import WaitTime from './WaitTime'
import React, { Component } from 'react';

class Today extends Component {

  render() {
  return (
    <div>
      <span class = "welc" >Today's Ride Times</span>
      <h2 className = "paragraph">Pick a ride to see the predictive wait times through the next 12 hours!</h2>
      <WaitTime />
    </div>
  );
  }

}

export default Today;

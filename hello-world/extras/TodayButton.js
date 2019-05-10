//TodayButton.js

import React from 'react'
import { Redirect } from 'react-router-dom'

class TodayButton extends React.Component {
  state = {
    redirect: false
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/today' />
    }
  }
  render () {
    return (
       <div>
        {this.renderRedirect()}
        <button onClick={this.setRedirect}>Ride Times Today</button>
       </div>
    )
  }
}

export default TodayButton
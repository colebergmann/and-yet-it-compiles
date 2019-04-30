//PlanButton.js
import React from 'react'
import { Redirect } from 'react-router-dom'
import Header from "./Header"

class PlanButton extends React.Component {
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
      return <Redirect to='/plan' />

    }
  }
  render () {
    return (
       <div>
        {this.renderRedirect()}
        <button onClick={this.setRedirect}>Plan Your Trip</button>
       </div>
    )
  }
}

export default PlanButton


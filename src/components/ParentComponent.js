import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import ChildComponent from "./ChildComponent"

class ParentComponent extends React.Component {
  render () {
    return <ChildComponent />
  }
}

export default ParentComponent
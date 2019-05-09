//plan graph container to get the data from api
import PlanGraph from "./PlanGraph"
import React, {Component} from "react"

export default class PlanGraphContainer extends Component {
  state = {
    dataToPass: []
  };

  async componentDidMount() {
    const response = await fetch('colebergmann.com:5000/callPred/0');  
    const data = await response.json(); 
    this.setState({dataToPass: data});
  }

  render() {
    return <PlanGraph data={this.state.dataToPass} />
  }
}

//App.js

import React from 'react';
import Footer from "./Footer"
import Header from "./Header"
import List from "./List"
import InputBox from "./InputBox"
import CheckBox from "./CheckBox"
import ContactCard from "./ContactCard"
import RideForm from "./RideForm"
import Chart from "./Chart"
import BarGraph from "./BarGraph"
import Logo from "./Logo"
import TodayButton from "./TodayButton"
import PlanButton from "./PlanButton"
import MyComponent from "./MyComponent"
import BasicExample from "./BasicExample"


//import AppRouter from "./AppRouter"
//import { ReactComponent as Logo } from './Magic Minutes Transparent.png'; // Tell Webpack this JS file uses this image


//import { Router, Route, browserHistory } from 'react-router'


function App(){
	return(
		<div>
			<nav>
				<Logo />
				<BasicExample />
				
			</nav>
			<main>		
				<h2>Thank you for visiting Magic Minutes!</h2>
				<Footer />
			</main>
		</div>
	)
}


export default App
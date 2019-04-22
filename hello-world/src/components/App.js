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


function App(){
	return(
		<div>
			<nav>
				<Header />
				<List />
				<InputBox />
				<CheckBox />
			</nav>
			<main>		
				<RideForm />
				<Chart />
				<Footer />
			</main>
		</div>

		/*
		<div className = "contacts">
		<ContactCard 
		name = "abby" 
		imgURL = "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjdpKi339rhAhWIwVQKHRufDMwQjRx6BAgBEAU&url=https%3A%2F%2Fwww.akc.org%2Fexpert-advice%2Fhealth%2Fpuppies-how-much-exercise%2F&psig=AOvVaw0Wtbtq0cXHYpKbUOr05e0H&ust=1555714805847172"
		address = "98765432dfghjk"
		/>
		</div>
		*/
	)
}

export default App
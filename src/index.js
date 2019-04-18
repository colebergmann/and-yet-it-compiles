//index.js

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from "./components/App"

//import Title from "./Display"

// ReactDOM.render(<div><h1>Magic Minutes!</h1>
// 	<p>Today</p></div>, document.getElementById("root"))

// var myNewP = document.createElement("p")
// myNewP.innerHTLM = "Today"

/* Title function header now in the Header.js
function Title(){
	return(
	<div>
	<h1> Magic Minutes! </h1> 
 	</div>
	)
}
*/

// /* Today function paragraph*/
// function Today(){
// 	return(
// 	<div>
// 	<p> Today </p>
//  	</div>
// 	)
// }

// /* Title and List function*/
// function TitleAndList(){
// 	return(
// 		<div>
// 		<Title/>
// 		<List/>
// 		</div>
// 		)
// }


// /* List function*/
// function List(){
// 	return (
// 		<ul>
// 	<li>1</li>
// 	<li>2</li>
// 	<li>3</li>
// 	</ul>
// 	)
// }




ReactDOM.render(
	<App />,
	document.getElementById("root")
)




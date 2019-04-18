//App.js

import React from 'react';
import Footer from "./Footer"
import Header from "./Header"
import List from "./List"
import Button from "./Button"

function App(){
	return(
		<div>
			<nav>
				<Header />
				<List />
			</nav>
			<main>
				<Button />
				<Footer />
			</main>
		</div>
	)
}

export default App
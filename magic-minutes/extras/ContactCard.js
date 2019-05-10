//ContactCard.js

import React from 'react';

function ContactCard(props){
	return(
		<div>
			<img src = {props.imgURL} />
			<h3> Name {props.name} </h3>
			<p> Address {props.address} </p>
		</div>
	)
}

export default ContactCard
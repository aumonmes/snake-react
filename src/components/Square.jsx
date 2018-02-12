import React, { Component } from 'react';

import '../css/Square.css';

export default class Square extends Component {

	// Get a list of all the classes needed for this square
	getClasses() {
		const classes = [];
		const square = this.props.square;

		// Worm classes
		if(square.worm) classes.push('worm');
		if(square.head) classes.push('head');
		if(square.tail) classes.push('tail');

		// Direction classes
		if(square.in) classes.push(square.in);
		if(square.out) classes.push(square.out);

		return classes.join(' ');
	}

	/** Main render **/
	render() {
		const classes = this.getClasses();

		return <div className={`square ${classes}`}></div>
	}
}

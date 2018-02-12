import React, { Component } from 'react';

import Worm from './classes/Worm';

import Board from './components/Board.jsx';


export default class App extends Component {
	constructor() {
		super();

		this.state = {
			dead: false,
			worm: new Worm(),
			boardSize: [40, 20],
			nextDirection: false,
			mainLoop: false
		}
	}

	/** React events **/
	componentDidMount() {
		document.body.addEventListener('keydown', this.onKeyDown.bind(this), false);
	}
	componentWillUnmount() {
		document.body.removeEventListener('keydown', this.onKeyDown);
	}

	/** Component events **/
	onKeyDown(e) {
		e.preventDefault();
		this.setNextDirection(e.key);
	}

	/** Component methods **/
	getNextSquare(action, worm) {
		const actions = {
			'n': head => ({...head, y: head.y - 1 }),
			's': head => ({...head, y: head.y + 1 }),
			'w': head => ({...head, x: head.x - 1 }),
			'e': head => ({...head, x: head.x + 1 })
		};

		const head = worm.getHead();
		return actions[action](head);
	}

	setNextDirection(action) {
		let nextDirection = false;
		switch(action) {
			case 'ArrowUp':    nextDirection = 'n'; break;
			case 'ArrowDown':  nextDirection = 's'; break;
			case 'ArrowLeft':  nextDirection = 'w'; break;
			case 'ArrowRight': nextDirection = 'e'; break;
			default:           nextDirection = this.state.worm.direction;
		}
		this.setState({ nextDirection: nextDirection});
	}

	// Test if the worm crashed and died
	wormCrash(nextSquare, worm) {
		if(this.offBoundries(nextSquare)) return true;
		if(this.wormEatItself(nextSquare, worm)) return true;
		return;
	}

	// Test if worm is out off board boundries
	offBoundries(nextSquare) {
		if(nextSquare.x < 0 || nextSquare.x >= this.state.boardSize[0]) return true;
		if(nextSquare.y < 0 || nextSquare.y >= this.state.boardSize[1]) return true;
	}

	// Test if worm is crashing with itself
	wormEatItself(nextSquare, worm) {
		return worm.hasBeenIn(nextSquare);
	}

	move() {
		const worm = this.state.worm;
		const nextDirection = this.state.nextDirection || this.state.worm.direction;
		const nextSquare = this.getNextSquare(nextDirection, worm);

		// Check if worm has crashed
		if(this.wormCrash(nextSquare, worm)) this.die();

		worm.direction = nextDirection;
		worm.move(nextSquare);

		this.setState({ worm: worm });
		this.setState({ nextDirection: false });
	}

	// Run main loop
	startLoop() {
		if(this.state.mainLoop) return;

		const mainLoop = setInterval(() => this.move(), 200);

		this.setState({ mainLoop });
	}

	// Finish the game
	die() {
		clearInterval(this.state.mainLoop);
		this.setState({ dead: true });
	}


	/** Main render **/
	render() {
		this.startLoop();

		return this.state.dead ?
			<div>Dead</div>
			: <Board worm={ this.state.worm } boardSize={ this.state.boardSize } />
	}
}

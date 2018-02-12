import React, { Component } from 'react';

import Square from './Square.jsx';

import '../css/Board.css';

export default class Board extends Component {

	// Recalculate the board
	getSquares(worm) {
		const boardSize = this.props.boardSize;
		// Generate all squares
		const squares = [...Array(boardSize[1]).keys()].map(y => {
			return [...Array(boardSize[0]).keys()].map(x => {
				return {
					x: x,
					y: y
				};
			});
		});

		// Paint the ones that have worm
		worm.track.forEach(w => {
			squares[w.y][w.x].worm = true;
			squares[w.y][w.x].in = w.in || false;
			squares[w.y][w.x].out = w.out || false;
		});

		// Add head
		const head = worm.getHead();
		squares[head.y][head.x].head = true;

		// Add tail
		const tail = worm.getTail();
		squares[tail.y][tail.x].tail = true;

		return squares;
	}

	/** Main render **/
	render() {
		const squares = this.getSquares(this.props.worm);
		let dummyKeys = 0;

		return <div id="board">
				{squares.map(row => {
					return <div className="row" key={ dummyKeys++ }>
							{ row.map(square => <Square square={ square } key={ dummyKeys++ }/> ) }
						</div>
					})}
			</div>
	}
}

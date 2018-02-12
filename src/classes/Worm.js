
import { compare } from '../globals/functions';

export default class Worm {
	constructor(firstSquare = false, direction = false) {
		this.direction = direction || 'e';
		this.track = [];
		this.track.push(firstSquare || { x: 0, y:0 });
	}

	getHead() { return this.track.slice(-1).pop(); }

	getTail() { return this.track[0]; }

	getChangeDirection(nextSquare) {
		const head       = this.getHead();
		const horizontal = compare(head.x, nextSquare.x);
		const vertical   = compare(head.y, nextSquare.y);

		console.log(horizontal);
		console.log(vertical);

		let outDirection = false;
		let inDirection  = false;

		if(horizontal === 1) {
			outDirection = 'w';
			inDirection  = 'e';
		} else if(horizontal === -1) {
			outDirection = 'e';
			inDirection  = 'w';
		} else if(vertical === 1) {
			outDirection = 'n';
			inDirection  = 's';
		} else if(vertical === -1) {
			outDirection = 's';
			inDirection  = 'n';
		}

		return {
			out: outDirection,
			in:  inDirection
		};
	}

	setDirection(direction) { this.direction = direction; }

	setHead(newTrack) { this.track.push(newTrack); }

	setNeckOut(direction) { this.track[this.track.length - 2].out = direction; }

	hasBeenIn(nextSquare) {
		return this.track.some(w => w.x === nextSquare.x && w.y === nextSquare.y);
	}

	move(nextSquare) {
		const inOut = this.getChangeDirection(nextSquare);
		const newHead = {...nextSquare, in: inOut.in };

		this.setHead(newHead);
		this.setNeckOut(inOut.out);
		this.setDirection(inOut.out);
	}

}

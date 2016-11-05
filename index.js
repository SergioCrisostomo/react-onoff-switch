
import React from 'react';
import {grey, offBackground, onBackground, buttonStyle, setStyles} from './styles.js';

export default class OnOff extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			on: !!props.initialValue, // false if not set
			width: props.with || 100,
			buttonColor: props.buttonColor || '#FFFFFF',
			passiveColor: props.passiveColor || '#FFFFFF',
			activeColor: props.activeColor || '#13BF11'
		};

		this.handleChange = this.handleChange.bind(this);
		this.onChange = props.onChange || (() => {});
		this.onPointerDown = this.onPointerDown.bind(this);
		this.onDrag = this.onDrag.bind(this);
		this.onDragEnd = this.onDragEnd.bind(this);
	}

	handleChange() {
		this.setState(
			{on: !this.state.on},
			() => this.onChange(this.state.on) // callback to parent Component
		);
	}

	getPointerCoords(e){
		return {
			x: e.pageX || e.touches[0].pageX,
			y: e.pageY || e.touches[0].pageY
		};
	}

	onPointerDown(e){
		this.touchDown = this.getPointerCoords(e.nativeEvent).x - parseInt(e.target.style.left, 10);
		window.addEventListener('ontouchend' in global ? 'touchend' : 'mouseup', this.onDragEnd);
	}

	onDrag(e){
		if (!this.touchDown) return;
		e.preventDefault();
		const positionNow = this.getPointerCoords(e.nativeEvent).x;
		let diff = positionNow - this.touchDown;
		const max = 0.6 * this.state.width;
		if (diff < 0) diff = 0;
		else if (diff > max) diff = max;

		e.target.style.left = diff + 'px';
	}

	onDragEnd(e){
		window.removeEventListener('ontouchend' in global ? 'touchend' : 'mouseup', this.onDragEnd);
		this.touchDown = null;
	}

	render() {
		const on = this.state.on;

		const active = setStyles({
			...onBackground,
			width: on ? 1 : 0.6,
			background: this.state.activeColor
		}, this.state.width);

		const passive = setStyles({
			...offBackground,
			left: on ? 0.4 : 0,
			width: on ? 0.6 : 1,
			background: this.state.passiveColor
		}, this.state.width);

		const button = setStyles({
			...buttonStyle,
			left: on ? 0.4 : 0,
			boxShadow: `inset 0 0 0 1px ${on ? this.state.activeColor : grey}, 0 2px 4px ${grey}`,
			background: this.state.buttonColor
		}, this.state.width);

		return (
			<div
				onClick={this.handleChange}
				style={{position: 'relative', height: 0.6 * this.state.width}}
				>
				<div style={active}/>
				<div style={passive}/>
				<div
					onMouseMove={this.onDrag}
					onTouchMove={this.onDrag}
					onTouchStart={this.onPointerDown}
					onMouseDown={this.onPointerDown}
					style={button}/
					>
			</div>
		)
	}
}

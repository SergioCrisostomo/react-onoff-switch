
import React from 'react';
import {grey, offBackground, onBackground, buttonStyle, setStyles} from './styles.js';

export default class OnOff extends React.Component {
	constructor(props) {
		super(props);
		const active = !!props.initialValue;
		this.state = {
			on: active, // false if not set
			width: props.with || 100,
			activeColorWidth: active ? 1 : 0.6,
			buttonPosition: active ? 0.4 : 0,
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

	handleChange(state) {
		const val = typeof state == 'boolean' ? state : !this.state.on;
		this.setState({
			on: val,
			buttonPosition: val ? 0.4 : 0,
			activeColorWidth: val ? 1 : 0.6
		},
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
		window.addEventListener('ontouchend' in window ? 'touchend' : 'mouseup', this.onDragEnd);
		if ('onmouseout' in window) e.target.addEventListener('mouseout', this.onDragEnd);
	}

	onDrag(e){
		e.preventDefault();
		if (!this.touchDown) return;
		else this.dragged = true;

		const positionNow = this.getPointerCoords(e.nativeEvent).x;
		let diff = (positionNow - this.touchDown) / this.state.width;
		// o.4 and 0.6 are related to proportions where 1 is the width
		const max = 0.4;
		if (diff < 0) diff = 0;
		else if (diff > max) diff = max;
		const pos = 0.6 + diff;

		this.setState({
			buttonPosition: diff,
			activeColorWidth: pos
		});
	}

	onDragEnd(e){
		window.removeEventListener('ontouchend' in window ? 'touchend' : 'mouseup', this.onDragEnd);
		if ('onmouseout' in window) e.target.removeEventListener('mouseout', this.onDragEnd);
		const newState = this.dragged ? this.state.buttonPosition > 0.2 : !this.state.on;
		this.handleChange(newState);
		this.touchDown = this.dragged = null;
	}

	render() {
		const on = this.state.on;

		const active = setStyles({
			...onBackground,
			width: this.state.activeColorWidth,
			background: this.state.activeColor
		}, this.state.width);

		const passive = setStyles({
			...offBackground,
			background: this.state.passiveColor
		}, this.state.width);

		const button = setStyles({
			...buttonStyle,
			left: this.state.buttonPosition,
			boxShadow: `inset 0 0 0 1px ${on ? this.state.activeColor : grey}, 0 2px 4px ${grey}`,
			background: this.state.buttonColor
		}, this.state.width);

		return (
			<div
				/*onClick={this.handleChange}*/
				style={{position: 'relative', height: 0.6 * this.state.width}}
				>
				<div style={passive}/>
				<div style={active}/>
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

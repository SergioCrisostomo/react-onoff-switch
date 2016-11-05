
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
	}

	handleChange() {
		this.setState(
			{on: !this.state.on},
			() => this.onChange(this.state.on) // callback to parent Component
		);
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
			<div onClick={this.handleChange} style={{position: 'relative', height: 0.6 * this.state.width}}>
				<div style={active}/>
				<div style={passive}/>
				<div style={button}/>
			</div>
		)
	}
}

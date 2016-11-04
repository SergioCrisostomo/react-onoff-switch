
import React from 'react';

const grey = '#CCC';
const offBackground = {
	top: 0,
    boxShadow: `inset 0 0 0px 1px ${grey}`,
    height: 0.6,
    width: 1
}

const onBackground = {
	top: 0,
    height: 0.6
}

const buttonStyle = {
    height: 0.6,
    width: 0.6,
    top: 0
}

const commonStyles = {
	position: 'absolute',
	borderRadius: 0.3,
	transition: '0.1s ease-in-out'
}

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

	setStyles(obj){
		const styles = {
			...obj,
			...commonStyles
		}
		for (var key in styles) {
			if (typeof styles[key] == 'number') styles[key] = this.state.width * styles[key] + 'px';
		}
		return styles;
	}

	render() {
		const on = this.state.on;

		const active = this.setStyles({
			...onBackground,
			width: on ? 1 : 0.6,
			background: this.state.activeColor
		});
		const passive = this.setStyles({
			...offBackground,
			width: on ? 0.6 : 1,
			left: on ? 0.4 : 0,
			background: this.state.passiveColor
		});
		const button = this.setStyles({
			...buttonStyle,
			background: this.state.buttonColor,
			left: on ? 0.4 : 0,
			boxShadow: `inset 0 0 0 1px ${on ? this.state.activeColor : grey}, 0 2px 4px ${grey}`
		});

		return (
			<div onClick={this.handleChange} style={{position: 'relative', height: 0.6 * this.state.width}}>
				<div style={active}/>
				<div style={passive} />
				<div style={button}/>
			</div>
		)
	}
}

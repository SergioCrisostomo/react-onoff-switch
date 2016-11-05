
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

const setStyles = (obj, width) => {
	const styles = {
		...obj,
		...commonStyles
	}
	for (var key in styles) {
		if (typeof styles[key] == 'number') styles[key] = width * styles[key] + 'px';
	}
	return styles;
}

module.exports = {
	grey: grey,
	offBackground: offBackground,
	onBackground: onBackground,
	buttonStyle: buttonStyle,
	setStyles: setStyles
}

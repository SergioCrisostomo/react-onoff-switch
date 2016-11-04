
import ReactDOM from 'react-dom';
import OnOff from './index.js'

const stateDiv = document.getElementById('state');
const reporter = who => val => stateDiv.innerHTML = `${who} changed value to ${val}!`;

ReactDOM.render(
	<div>
		<OnOff onChange={reporter('Blue button')} activeColor={'#CCE'} initialValue={true}/>
		<p/>
		<OnOff onChange={reporter('Green button')}/>
	</div>,
	document.getElementById('app')
);

export default {};

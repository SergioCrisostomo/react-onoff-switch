
# OnOff switch button

React component, on-off sliding button to keep track of a user choice or state.

	npm install react-onoff-switch

## API

### Usage

	import OnOff from './index.js'
	ReactDOM.render(
		<OnOff onChange={(value) => console.log('New value is:', value)}/>,
		document.getElementById('app')
	);

### props

<table class="table table-bordered table-striped">
    <thead>
        <tr>
            <th style="width: 100px;">name</th>
            <th style="width: 50px;">type</th>
            <th style="width: 50px;">default</th>
            <th>description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>initialValue</td>
            <td>Boolean</td>
            <td>false</td>
            <td>The initial state</td>
        </tr>
        <tr>
            <td>onChange</td>
            <td>Function</td>
            <td></td>
            <td>Change callback, receives current value as argument</td>
        </tr>
        <tr>
            <td>width</td>
            <td>Number</td>
            <td>100</td>
            <td>Component size, will be used as pixels</td>
        </tr>
        <tr>
            <td>buttonColor</td>
            <td>Stringe</td>
            <td>'#FFFFFF'</td>
            <td>Button color</td>
        </tr>
        <tr>
            <td>passiveColor</td>
            <td>Stringe</td>
            <td>'#FFFFFF'</td>
            <td>Passive background color</td>
        </tr>
        <tr>
            <td>activeColor</td>
            <td>Stringe</td>
            <td>'#13BF11' (green)</td>
            <td>Active background color</td>
        </tr>
    </tbody>
</table>
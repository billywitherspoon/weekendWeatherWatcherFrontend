import React, { Component } from 'react';
import './App.css';

import DestinationFormContainer from './containers/DestinationFormContainer';
import HomeContainer from './containers/HomeContainer.js';

class App extends Component {
	constructor() {
		super();
		this.state = {};
	}

	render() {
		return (
			<div>
				<HomeContainer />
			</div>
		);
	}
}

//<DestinationFormContainer />


export default App;

import React, { Component } from 'react';
import AutocompleteSearch from '../components/AutocompleteSearch';
import AddDestinationTag from '../components/AddDestinationTag';

class DestinationFormContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			userInput: '',
			sessionToken: this.createSessionToken(),
			latLng: {},
			addTags: false,
			tags: [],
			tagCount: 0,
			destination: ''
		};
	}

	createSessionToken = () => {
		let token = Math.random() * 1000000000000000000;
		console.log('TOKEN:', token);
		return token;
	};

	handleSubmit = (ev) => {
		ev.preventDefault();
		console.log('Handling form submit.');

    let destinationFormData = {
      destination: {
        latitude: this.state.latLng.lat,
        longitude: this.state.latLng.lng,
        name: this.state.destination},
      tags: this.state.tags,
      user_id: 1
    }

    console.log("DATA: ", destinationFormData)

    fetch("http://localhost:3000/api/v1/destinations", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(destinationFormData)
      }).then(res => res.json())
      .then(json => console.log(json))
      .catch(error => console.error('Error', error))
	};

	setLatLng = (latLng) => {
		console.log('Setting lat/lon state in form.');
		this.setState((prevState) => {
			return { latLng: latLng, addTags: true };
		});
	};

	setDestination = (destination) => {
		this.setState({ destination });
	};

	renderTagForm = () => {
		let tempArray = [];
		for (let i = 0; i < this.state.tagCount; i++) {
			tempArray.push('item');
		}
		return tempArray.map((item) => {
			return <AddDestinationTag persistTag={this.persistTag} />;
		});
	};

	addNewTagForm = () => {
		this.setState((prevState) => {
			return { tagCount: prevState.tagCount + 1, addTags: false };
		});
	};

	persistTag = (ev) => {
		ev.preventDefault();
		let string = ev.target.value;
		let hashTag = '#' + string.split(' ').join('');
		this.state.tags.push(hashTag);
		this.setState({ addTags: true, tagCount: 0 });
	};

	render() {
		return (
			<div id="destination-form-container">
				<h3>Add New Destination:</h3>
				<form onSubmit={(ev) => this.handleSubmit(ev)}>
					{this.state.destination === '' ? (
						<AutocompleteSearch setLatLng={this.setLatLng} setDestination={this.setDestination} />
					) : (
						<div>
							<h2>{this.state.destination}</h2>
							<h3>{this.state.tags.join(' ')}</h3>
						</div>
					)}
					{this.renderTagForm()}
					{this.state.addTags ? (
						<button
							onClick={(ev) => {
								this.addNewTagForm(ev);
							}}
						>
							Add Tag
						</button>
					) : null}
					<br />
					<input type="submit" />
				</form>
			</div>
		);
	}
}

export default DestinationFormContainer;

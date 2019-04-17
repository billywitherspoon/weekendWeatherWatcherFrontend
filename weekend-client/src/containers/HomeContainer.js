import React, { Component } from 'react';
import UserFormContainer from './UserFormContainer.js';
import UserPageContainer from './UserPageContainer';
// import DestinationFormContainer from './DestinationFormContainer';

class HomeContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showDestinationFormContainer: false,
			allDestinations: []
		};
		this.fetchDestinations();
	}

	fetchDestinations = () => {
		fetch('http://localhost:3000/api/v1/destinations').then((res) => res.json()).then((json) => {
			this.setState({ allDestinations: json });
		});
	};

	renderUserPageContainer = () => {
		if (this.props.currentUser) {
			return <UserPageContainer
				currentUser={this.props.currentUser}
				logoutUser={this.props.logoutUser}
				allDestinations={this.state.allDestinations}
			/>
		}
	};

	render() {
		return (
			<div id="home-container">
				{this.renderUserPageContainer()}
				<UserFormContainer
					currentUser={this.props.currentUser}
					loginUser={this.props.loginUser}
					logoutUser={this.props.logoutUser}
					showDestinationFormContainer={this.state.showDestinationFormContainer}
				/>
			</div>
		);
	}
}

export default HomeContainer;

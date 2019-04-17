import React, { Component, Fragment } from 'react';
import LoginForm from '../components/LoginForm.js';
import SignUpForm from '../components/SignUpForm.js';
import DestinationFormContainer from './DestinationFormContainer';

class UserFormContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			firstName: '',
			lastName: '',
			signUpActive: false
		};
	}

	handleNameChange = (ev) => {
		this.setState({
			[ev.target.name]: ev.target.value
		});
		console.log('state minus last input:', this.state);
	};

	handleLoginSubmit = (ev) => {
		ev.preventDefault();
		console.log('Login Submitted:');
		console.log(ev);
		if (this.state.username) {
			fetch(`http://localhost:3000/api/v1/users/username/${this.state.username}`)
				.then((res) => res.json())
				.then((user_json) => {
					console.log(user_json);
					if (user_json.error) {
						alert(user_json.error);
					} else {
						this.props.loginUser(user_json);
					}
				});
		} else {
			alert('Please fill in all fields');
		}
	};

	toggleSignUp = () => {
		this.setState((st) => {
			return {
				signUpActive: !st.signUpActive
			};
		});
		console.log('sign up toggled');
	};

	handleSignUpSubmit = (ev) => {
		ev.preventDefault();
		console.log('Sign Up Submitted:');
		if (this.state.username && this.state.firstName && this.state.lastName) {
			let userData = {
				username: `${this.state.username}`,
				first_name: `${this.state.firstName}`,
				last_name: `${this.state.lastName}`
			};
			fetch('http://localhost:3000/api/v1/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify(userData)
			})
				.then((res) => res.json())
				.then((user_json) => {
					console.log(user_json);
					if (user_json.error) {
						alert(user_json.error);
					} else {
						this.props.loginUser(user_json);
						this.setState({
							signUpActive: false
						});
					}
				})
				.catch((error) => console.error('Error', error));
		} else {
			alert('Please fill in all fields');
		}
	};

	renderUserForm = () => {
		if (!this.props.currentUser && this.state.signUpActive) {
			return (
				<div id="user-form-container">
					<SignUpForm
						currentUser={this.props.currentUser}
						loginUser={this.props.loginUser}
						logoutUser={this.props.logoutUser}
						handleNameChange={this.handleNameChange}
						username={this.state.username}
						firstName={this.state.firstName}
						lastName={this.state.lastName}
						handleSignUpSubmit={this.handleSignUpSubmit}
						toggleSignUp={this.toggleSignUp}
					/>
				</div>
			);
		} else if (!this.props.currentUser) {
			return (
				<div id="user-form-container">
					<LoginForm
						currentUser={this.props.currentUser}
						loginUser={this.props.loginUser}
						logoutUser={this.props.logoutUser}
						handleNameChange={this.handleNameChange}
						handleLoginSubmit={this.handleLoginSubmit}
						username={this.state.username}
						toggleSignUp={this.toggleSignUp}
					/>
				</div>
			);
		} else if (this.props.showDestinationFormContainer) {
			let userPageContainer = document.getElementById('user-page-container');
			userPageContainer.classList.add('blurred');
			return (
				<div id="user-form-container">
					<DestinationFormContainer />
				</div>
			);
		} else {
			return null;
		}
	};

	render() {
		return <fragment>{this.renderUserForm()}</fragment>;
	}
}
//add this line back in to get login stuff back
export default UserFormContainer;

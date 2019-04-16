import React, { Component } from 'react';
import DestinationFormContainer from './DestinationFormContainer';

import Profile from '../components/Profile'
import Explore from '../components/Explore'

class UserPageContainer extends Component {
  constructor(props){
    super(props)

    this.state = {
      viewProfile: true
    }
  }

//Toggles between user'sprofile and explore page
  toggleView = () => {
    this.setState((prevState) => {
      return {viewProfile: !(prevState.viewProfile)}
    })
  }


  render() {
    return (
      <div>
      Hello.
      {this.state.viewProfile?
        <Profile
          toggleView={this.toggleView}
          addDestination={this.addDestination}
          currentUser={this.props.currentUser}
        />
          :
        <Explore
          toggleView={this.toggleView}
          addDestination={this.addDestination}
          currentUser={this.props.currentUser}
        />
      }

      </div>
    );
  }
}

export default UserPageContainer;

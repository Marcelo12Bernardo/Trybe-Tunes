import React from 'react';
import Header from '../Components/Header';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile" id="page-profile">
        <h3>Page Profile</h3>
        <Header />
      </div>
    );
  }
}

export default Profile;

import React from 'react';
import Header from '../Components/Header';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites" id="page-favorites">
        <h3>Page Favorites</h3>
        <Header />
      </div>
    );
  }
}

export default Favorites;

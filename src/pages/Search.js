import React from 'react';
import Header from '../Components/Header';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search" id="page-search">
        <h3>Page Search</h3>
        <Header />
      </div>
    );
  }
}

export default Search;

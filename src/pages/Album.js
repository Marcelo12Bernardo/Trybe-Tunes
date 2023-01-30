import React from 'react';
import Header from '../Components/Header';

class Album extends React.Component {
  render() {
    return (
      <section data-testid="page-album">
        <h3>Ṕage Album</h3>
        <Header />
      </section>
    );
  }
}

export default Album;

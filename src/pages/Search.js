import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Carregando from '../Components/Carregando';

class Search extends React.Component {
  state = {
    name: '',
    btnActivate: false,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmitBtn = (user) => {
    const { history } = this.props;
    this.setState({ btnActivate: true }, async () => {
      if (user) {
        await createUser({ name: user });
        return history.push('/search');
      }
    });
  };

  render() {
    const { name, btnActivate } = this.state;
    const minCharacter = 2;

    return (
      <div data-testid="page-search" id="page-search">
        <h3>Page Search</h3>
        <Header />
        <section>
          <input
            type="text"
            name="name"
            id="search-artist-input"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ name.length < minCharacter }
            onClick={ () => this.handleSubmitBtn(name) }
          >
            Pesquisar
          </button>
          { btnActivate && <Carregando /> }
        </section>
      </div>
    );
  }
}

export default Search;

Search.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

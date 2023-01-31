import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../Components/Header';
import Carregando from '../Components/Carregando';

class Search extends React.Component {
  state = {
    searchQuery: '',
    noResults: false,
    albums: [],
    isLoading: false,
    artistName: '',
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  searchAlbum = (artist) => {
    this.setState(
      {
        searchQuery: '',
        isLoading: true,
        artistName: artist,
      },

      async () => {
        const albums = await searchAlbumsAPI(artist);
        this.setState({ albums, isLoading: false });
        if (albums.length === 0) {
          this.setState({ noResults: true });
        }
      },
    );
  };

  render() {
    const { searchQuery, noResults, albums, isLoading, artistName } = this.state;
    const minCharCount = 2;

    if (isLoading) {
      return <Carregando />;
    } if (noResults) {
      return <h1>Nenhum álbum foi encontrado</h1>;
    }

    return (
      <div data-testid="page-search">
        <h3>Page Search</h3>
        <Header />
        <section>
          <input
            type="text"
            name="searchQuery"
            value={ searchQuery }
            data-testid="search-artist-input"
            onChange={ this.handleInputChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ searchQuery.length < minCharCount }
            onClick={ () => this.searchAlbum(searchQuery) }
          >
            Search
          </button>
          {albums.length >= 1 ? (
            <h1>{`Resultado de álbuns de: ${artistName}`}</h1>
          ) : null}
          {albums.map((album, index) => (
            <div key={ index }>
              <img src={ album.artworkUrl100 } alt="" />
              <Link
                data-testid={ `link-to-album-${album.collectionId}` }
                to={ `/album/${album.collectionId}` }
              >
                {album.collectionName}
              </Link>
            </div>
          ))}
        </section>
      </div>
    );
  }
}

export default Search;

/* Criar um componemte Album
 * Fazer um map e carregar o componemte
 * Refatorar codigo
 * Seguir dica de nomes semanticos
*/

// Search.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func,
//   }),
// }.isRequired;

import React from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../Components/Header';
import Carregando from '../Components/Carregando';
import CardMusicAlbum from '../Components/cardMusicAlbum';

class Favorites extends React.Component {
  state = {
    favoriteSongs: [],
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true }, async () => {
      const favoriteSongs = await getFavoriteSongs();
      this.setState({ favoriteSongs, isLoading: false });
    });
  }

  handleFavoriteRemove = (id) => {
    const { favoriteSongs } = this.state;

    const newSongsArray = favoriteSongs.filter(({ trackId }) => trackId !== id);
    this.setState({ favoriteSongs: newSongsArray });
  };

  render() {
    const { favoriteSongs, isLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        <h3>Page Favorites</h3>
        <Header />
        {isLoading ? (
          <Carregando />
        ) : (
          favoriteSongs.map(({ trackId, ...song }) => (
            <CardMusicAlbum
              track={ song }
              key={ trackId }
              handleFavoriteRemove={ () => this.handleFavoriteRemove(trackId) }
            />
          ))
        )}

      </div>
    );
  }
}

export default Favorites;

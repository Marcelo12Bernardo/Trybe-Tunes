import React from 'react';
import PropTypes from 'prop-types';
import getAlbumTracks from '../services/musicsAPI';
import Header from '../Components/Header';
import Carregando from '../Components/Carregando';
import CardMusicAlbum from '../Components/cardMusicAlbum';

class AlbumPage extends React.Component {
  state = {
    albumTracks: [],
    isLoading: true,
    albumDetails: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getAlbumTracks(id);
    const albumDetails = Object.assign({}, ...response.slice(0, 1));
    this.setState({ albumTracks: response.slice(1), isLoading: false, albumDetails });
  }

  render() {
    const { albumTracks, isLoading, albumDetails } = this.state;
    return (
      <section data-testid="page-album">
        <h3>Album Page</h3>
        <Header />
        {isLoading ? (
          <Carregando />
        ) : (
          <>
            <h2 data-testid="artist-name">
              {albumDetails.artistName}
            </h2>
            <h3 data-testid="album-name">{albumDetails.collectionName}</h3>
            <div>
              {albumTracks.map((track) => (
                <CardMusicAlbum
                  key={ track.trackId }
                  track={ track }
                />
              ))}
            </div>
          </>
        )}
      </section>
    );
  }
}

export default AlbumPage;

AlbumPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

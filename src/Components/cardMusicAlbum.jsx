import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class cardMusicAlbum extends React.Component {
  state = {
    isLoading: false,
    isChecked: false,
  };

  async componentDidMount() {
    this.setState({
      isChecked: await this.handleFavoritedSongs(),
    });
  }

  favoriteSong = ({ target: { checked } }) => {
    this.setState({ isLoading: true }, async () => {
      const { track } = this.props;
      if (checked) {
        await addSong(track);
        this.setState({ isChecked: true });
      } else {
        await removeSong(track);
        this.setState({ isChecked: false });
      }
      this.setState({ isLoading: false });
    });
  };

  handleFavoritedSongs = async () => {
    const { track: { trackId } } = this.props;
    const favoritedSongs = await getFavoriteSongs();
    return favoritedSongs.map((song) => song.trackId).includes(trackId);
  };

  render() {
    const { track: { trackName, previewUrl, trackId } } = this.props;
    const { isLoading, isChecked } = this.state;
    return (
      <section>
        <h4>{`${trackName}`}</h4>
        {
          isLoading ? (
            <Carregando />
          ) : (
            <div>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
              </audio>
              <label
                data-testid={ `checkbox-music-${trackId}` }
                htmlFor={ trackId }
              >
                <input
                  type="checkbox"
                  onChange={ this.favoriteSong }
                  id={ trackId }
                  checked={ isChecked }
                />
                Favorita
              </label>
            </div>
          )
        }
      </section>
    );
  }
}

export default cardMusicAlbum;

cardMusicAlbum.propTypes = {
  track: PropTypes.shape({
    trackId: PropTypes.number,
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
  }).isRequired,
};

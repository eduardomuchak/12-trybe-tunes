import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import '../styles/MusicCard.css';
import LoadingSong from './LoadingSong';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  handleClick = async ({ target }) => {
    const { track, favoriteSongs } = this.props;
    const isChecked = target.checked;
    this.setState({ loading: true });
    if (isChecked === false) {
      await removeSong(track);
    } else {
      await addSong(track);
    }
    await favoriteSongs();
    this.setState({ loading: false });
  }

  handleCheck = (trackId) => {
    const { favoriteSongsList } = this.props;
    if (favoriteSongsList.length > 0) {
      return favoriteSongsList.some((track) => track.trackId === trackId);
    }
    return false;
  }

  render() {
    const { loading } = this.state;
    const { track } = this.props;
    // console.log(track) => Objeto retornado pela API com as informações das músicas. (Ex.: trackName, previewUrl entre outras props)
    const { trackName, previewUrl, trackId } = track;

    return (
      <div className="track-container">
        {loading === true
          ? <LoadingSong />
          : (
            <>
              <span>{trackName}</span>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor={ `favorite-checkbox-${trackId}` }>
                {' '}
                Favorita
                <input
                  type="checkbox"
                  id={ `favorite-checkbox-${trackId}` }
                  data-testid={ `checkbox-music-${trackId}` }
                  onChange={ this.handleClick }
                  checked={ this.handleCheck(trackId) }
                />
              </label>
            </>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.objectOf(PropTypes.any),
  favoriteSongsList: PropTypes.arrayOf(PropTypes.any),
}.isRequired;

export default MusicCard;

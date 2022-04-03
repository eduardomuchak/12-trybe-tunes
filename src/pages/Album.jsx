import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import '../styles/Album.css';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      songList: [],
      loading: true,
      favoriteSongsList: [],
    };
  }

  componentDidMount() {
    this.getSongList();
    this.favoriteSongs();
  }

  getSongList = async () => {
    const { match: { params: { id } } } = this.props;
    const tracks = await getMusics(id);
    this.setState({
      songList: tracks,
      loading: false,
    });
  }

  favoriteSongs = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongsList: favoriteSongs,
    });
  }

  render() {
    const { songList, loading, favoriteSongsList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading === true
          ? <Loading />
          : (
            <div className="album-container">
              <div className="album-info">
                <img src={ songList[0].artworkUrl100 } alt="artwork" />
                <h3 data-testid="album-name">{songList[0].collectionName}</h3>
                <span data-testid="artist-name">{songList[0].artistName}</span>
                {/* Peguei a posição [0] do array pois no retorno da musicAPI é onde contém as informações sobre o álbum */}
              </div>
              <div className="tracks-info">
                {songList.map((track, index) => (
                  index > 0 && <MusicCard
                    key={ track.trackId }
                    track={ track }
                    favoriteSongsList={ favoriteSongsList }
                    favoriteSongs={ this.favoriteSongs }
                  />
                ))}
              </div>
            </div>
          )}
      </div>

    );
  }
}

Album.propTypes = {
  match: PropTypes.object,
}.isRequired;

export default Album;

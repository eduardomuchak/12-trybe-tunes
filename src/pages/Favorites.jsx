import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../styles/Favorites.css';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      favoriteSongsList: [],
    };
  }

  componentDidMount() {
    this.favoriteSongs();
    this.handleLoading();
  }

  favoriteSongs = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongsList: favoriteSongs,
    });
  }

  handleLoading = () => {
    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading, favoriteSongsList } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading === true
          ? <Loading />
          : (
            <div className="element">
              {
                favoriteSongsList.map((track) => (
                  <MusicCard
                    key={ track.trackId }
                    track={ track }
                    favoriteSongsList={ favoriteSongsList }
                    favoriteSongs={ this.favoriteSongs }
                  />
                ))
              }
            </div>
          )}
      </div>
    );
  }
}

Favorites.propTypes = {
  match: PropTypes.object,
}.isRequired;

export default Favorites;

import React, { Component } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/Search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      isSearchButtonDisabled: true,
      loading: false,
      albumList: [],
      artist: '',
    };
  }

  handleChange({ target }) {
    const minSearchLength = 2;
    this.setState({
      searchInput: target.value,
      isSearchButtonDisabled: target.value.length < minSearchLength,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { searchInput } = this.state;
    this.setState({
      searchInput: '',
      isSearchButtonDisabled: true,
      loading: true,
    }, async () => {
      const albums = await searchAlbumsAPI(searchInput);
      this.setState({
        loading: false,
        albumList: albums,
        artist: searchInput,
      });
    });
  }

  render() {
    const {
      searchInput,
      isSearchButtonDisabled,
      loading,
      albumList,
      artist,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        {loading === true
          ? <Loading />
          : (
            <form>
              <label htmlFor="searchInput" className="search-label">
                <input
                  data-testid="search-artist-input"
                  id="loginInput"
                  onChange={ (event) => this.handleChange(event) }
                  value={ searchInput }
                  placeholder="Digite o nome do artista aqui"
                  className="search-input"
                />
                <button
                  data-testid="search-artist-button"
                  type="submit"
                  disabled={ isSearchButtonDisabled }
                  onClick={ (event) => this.handleSubmit(event) }
                  className="search-button"
                >
                  Pesquisar
                </button>
              </label>
            </form>
          )}
        { artist && (
          <h1 className="search-Result">
            { `Resultado de álbuns de: ${artist}`}
          </h1>
        )}
        {albumList.length
          ? (
            <div className="search-album-container">
              {albumList.map((album) => (

                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                  key={ album.collectionId }
                  className="search-album-sub-container"
                >
                  <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                  <h3>{ album.artistName }</h3>
                  <span>{ album.collectionName }</span>
                </Link>

              ))}
            </div>
          )
          : <h1 className="search-Result">Nenhum álbum foi encontrado</h1>}
      </div>
    );
  }
}

export default Search;

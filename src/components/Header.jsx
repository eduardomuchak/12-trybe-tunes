import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../styles/Header.css';
import Loading from './Loading';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      userName: '',
      userImage: 'https://cdn-icons.flaticon.com/png/512/1144/premium/1144760.png?token=exp=1648955720~hmac=6c335743ca784c17cbcd6e9953f040f6',
    };
  }

  async componentDidMount() {
    const login = await getUser();
    this.setState({
      loading: false,
      userName: login.name,
      userImage: login.image,
    });
  }

  // Requisito 3 finalizado com a ajuda do summer de instrução Gabriel Pinheiro
  render() {
    const { loading, userName, userImage } = this.state;
    return (
      <header data-testid="header-component" className="header-container">
        {loading === true
          ? <Loading />
          : (
            <>
              <div className="user-container">
                <img
                  src={ userImage }
                  alt="Imagem de perfil da pessoa usuária"
                  className="user-image"
                />
                <span data-testid="header-user-name">
                  {userName}
                </span>
              </div>
              <div className="links-container">
                <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
                <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
                <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
              </div>
            </>
          )}
      </header>
    );
  }
}

export default Header;

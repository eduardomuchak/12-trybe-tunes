import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import '../styles/Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userName: '',
      userEmail: '',
      userImage: 'https://cdn-icons.flaticon.com/png/512/2352/premium/2352166.png?token=exp=1647806540~hmac=7714de0d6a559d24021fd300e1c84e89',
      userDescription: '',
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const { userImage } = this.state;
    const login = await getUser();
    this.setState({
      loading: false,
      userName: login.name,
      userEmail: login.email,
      userImage: login.image,
      userDescription: login.description,
    });
    if (userImage !== 'https://cdn-icons.flaticon.com/png/512/2352/premium/2352166.png?token=exp=1647806540~hmac=7714de0d6a559d24021fd300e1c84e89') {
      this.setState({
        userImage: login.image,
      });
    }
  }

  render() {
    const {
      loading,
      userName,
      userEmail,
      userImage,
      userDescription } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {loading === true
          ? <Loading />
          : (
            <div className="container-profile">
              <img
                data-testid="profile-image"
                src={ userImage }
                alt="userProfileImage"
                className="profile-picture"
              />
              <div className="profile-info">
                <h3>Nome:</h3>
                <p>{userName}</p>
                <h3>Email:</h3>
                <p>{userEmail}</p>
                <h3>Bio:</h3>
                <p>{userDescription}</p>
                <Link to="/profile/edit">
                  <button type="button" className="edit-profile-button">
                    Editar perfil
                  </button>
                </Link>
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import '../styles/ProfileEdit.css';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userName: '',
      userEmail: '',
      userImage: 'https://cdn-icons.flaticon.com/png/512/2352/premium/2352166.png?token=exp=1647806540~hmac=7714de0d6a559d24021fd300e1c84e89',
      userDescription: '',
      isSaveButtonDisabled: true,
      image: 'https://cdn-icons.flaticon.com/png/512/2352/premium/2352166.png?token=exp=1647806540~hmac=7714de0d6a559d24021fd300e1c84e89',
      // image: 'https://avatars.githubusercontent.com/u/81588512?s=400&u=d9f97ff4c05c8bea1031fc811e9443705f5ee6c5&v=4',
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.buttonValidation);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { userName, userEmail, userImage, userDescription } = this.state;
    const updatedInfo = {
      name: userName,
      email: userEmail,
      image: userImage,
      description: userDescription,
    };
    this.setState({ loading: true }, async () => {
      const { history } = this.props;
      await updateUser(updatedInfo);
      history.push('/profile');
    });
  };

  getUserInfo = async () => {
    const login = await getUser();
    this.setState({
      loading: false,
      userName: login.name,
      userEmail: login.email,
      // userImage: login.image,
      userDescription: login.description,
    }, () => this.buttonValidation());
    // Requisito 14 finalizado com a ajuda do Summer de Instrução Gabriel Pinheiro e Imar Mendes
  }

  buttonValidation = () => {
    const { userName, userEmail, userImage, userDescription } = this.state;
    if (userName.length
      && userEmail.length
      && userImage.length
      && userDescription.length) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    }
  }

  render() {
    const {
      loading,
      userName,
      userEmail,
      userImage,
      userDescription,
      isSaveButtonDisabled,
      image } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header
          userImage={ image }
        />
        {loading === true
          ? <Loading />
          : (
            <div className="container-profile">
              <img
                src={ userImage }
                alt="Imagem de perfil da pessoa usuária"
                className="profile-picture"
              />
              <form className="container-form">
                <label htmlFor="inputName" className="sub-container-profile">
                  <h3>Nome:</h3>
                  <input
                    data-testid="edit-input-name"
                    type="text"
                    id="inputName"
                    onChange={ (event) => this.handleChange(event) }
                    value={ userName }
                    name="userName"
                    className="edit-inputs"
                  />
                </label>

                <label htmlFor="inputEmail" className="sub-container-profile">
                  <h3>Email:</h3>
                  <input
                    data-testid="edit-input-email"
                    type="email"
                    id="inputEmail"
                    onChange={ (event) => this.handleChange(event) }
                    value={ userEmail }
                    name="userEmail"
                    className="edit-inputs"
                  />
                </label>
                <label htmlFor="inputDescription" className="sub-container-profile">
                  <h3>Descrição:</h3>
                  <textarea
                    data-testid="edit-input-description"
                    type="text"
                    id="inputDescription"
                    onChange={ (event) => this.handleChange(event) }
                    value={ userDescription }
                    name="userDescription"
                    className="edit-inputs"
                  />
                </label>
                <label htmlFor="inputImage" className="sub-container-profile">
                  <h3>Imagem:</h3>
                  <input
                    data-testid="edit-input-image"
                    type="text"
                    id="inputImage"
                    onChange={ (event) => this.handleChange(event) }
                    value={ userImage }
                    name="userImage"
                    className="edit-inputs"
                  />
                </label>
                <button
                  data-testid="edit-button-save"
                  type="submit"
                  id="submitEdition"
                  disabled={ isSaveButtonDisabled }
                  onClick={ (event) => this.handleSubmit(event) }
                  className="save-changes-button"
                >
                  Salvar alterações
                </button>
              </form>
            </div>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;

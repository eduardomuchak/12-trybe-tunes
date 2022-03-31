import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import '../styles/Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      isLoginButtonDisabled: true,
      loading: false,
      isUserLogged: false,
    };
  }

  handleChange({ target }) {
    const minUserNameLength = 3;
    this.setState({
      userName: target.value,
      isLoginButtonDisabled: target.value.length < minUserNameLength,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { userName } = this.state;
    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name: userName });
      this.setState({
        loading: false,
        isUserLogged: true,
      });
    });
  }

  render() {
    const { userName, isLoginButtonDisabled, loading, isUserLogged } = this.state;
    return (
      <div data-testid="page-login" className="main-content">
        {loading === true
          ? <Loading />
          : (
            <form>
              <label htmlFor="loginInput" className="login-label">
                <input
                  data-testid="login-name-input"
                  id="loginInput"
                  onChange={ (event) => this.handleChange(event) }
                  value={ userName }
                  placeholder="Digite o usuário"
                  className="login-input"
                />
                <button
                  data-testid="login-submit-button"
                  type="submit"
                  disabled={ isLoginButtonDisabled }
                  onClick={ (event) => this.handleSubmit(event) }
                  className="login-button"
                >
                  Entrar
                </button>
              </label>
            </form>
          )}
        {isUserLogged && <Redirect to="/search" />}
      </div>
    );
  }
}

export default Login;

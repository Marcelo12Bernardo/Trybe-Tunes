import React from 'react';
import PropTypes from 'prop-types';
import Carregando from '../Components/Carregando';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    name: '',
    btnActivate: false,
  };
  // Criar serviço de validação do campo
  // Usar na page search

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmitBtn = (userName) => {
    const { history } = this.props;
    this.setState({ btnActivate: true }, async () => {
      if (userName) {
        await createUser({ name: userName });
        return history.push('/search');
      }
    });
  };

  render() {
    const { name, btnActivate } = this.state;
    const minCharacter = 3;

    return (
      <div data-testid="page-login">
        <input
          type="text"
          data-testid="login-name-input"
          name="name"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ name.length < minCharacter }
          onClick={ () => this.handleSubmitBtn(name) }
        >
          Entrar
        </button>
        { btnActivate && <Carregando /> }
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

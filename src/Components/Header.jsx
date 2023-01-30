import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  state = {
    userName: 'User',
    loading: true,
  };

  componentDidMount() {
    this.user();
  }

  user = async () => {
    const user = await getUser();

    this.setState({
      userName: user.name,
      loading: false,
    });
  };

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        <section>
          {
            !loading
              ? (
                <h3 data-testid="header-user-name">
                  { userName }
                </h3>
              )
              : <Carregando />
          }
        </section>
        <section>
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </section>
      </header>
    );
  }
}

export default Header;

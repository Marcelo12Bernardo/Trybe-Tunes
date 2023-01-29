import React from 'react';
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
        {
          !loading
            ? (
              <h3 data-testid="header-user-name">
                { userName }
              </h3>
            )
            : <Carregando />
        }
      </header>
    );
  }
}

export default Header;

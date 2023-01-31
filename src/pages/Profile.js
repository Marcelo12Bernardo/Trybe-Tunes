import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../Components/Header';
import Carregando from '../Components/Carregando';

class Profile extends React.Component {
  state = {
    name: '',
    email: '',
    description: '',
    image: '',
    isLoading: true,
  };

  async componentDidMount() {
    const { name, email, description, image } = await getUser();

    this.setState({
      name,
      email,
      description,
      image,
      isLoading: false,
    });
  }

  render() {
    const { name, email, description, image, isLoading } = this.state;
    return (
      <div data-testid="page-profile">
        <h3>Page Profile</h3>
        <Header />
        {isLoading ? (
          <Carregando />
        ) : (
          <div>
            <h1>{name}</h1>
            <p>{email}</p>
            <p>{description}</p>
            <img data-testid="profile-image" src={ image } alt={ name } />
            <button type="button">
              <Link to="/profile/edit">Editar perfil</Link>
            </button>
          </div>
        )}

      </div>
    );
  }
}

export default Profile;

import React from 'react';
import { Route } from 'react-router-dom';
import ProfileEdit from './pages/ProfileEdit';
import Profile from './pages/Profile';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Search from './pages/Search';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <>
        <Route exact path="/" component={ Login } />
        <Route exact path="/search" component={ Search } />
        <Route exact path="/album/:id" component={ Album } />
        <Route exact path="/favorites" component={ Favorites } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/profile/edit" component={ ProfileEdit } />
        <Route exact path="*" component={ NotFound } />
      </>
    );
  }
}

export default App;

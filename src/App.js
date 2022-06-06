import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'
import Navbar  from './components/Navbar';
import { MuiThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core';
import AuthRoute from './util/AuthRoute';
// import jwtDecode from 'jwt-decode';
import { Component } from 'react'


import { Provider } from 'react-redux';
import store from './redux/store'

const theme = createMuiTheme({
  palette: {

    primary: {

      light: '#33c9dc',

      main: '#00bcd4',

      dark: '#008394',

      contrastText: '#fff',

    },

    secondary: {

      light: '#ff6333',

      main: '#ff3d00',

      dark: '#b22a00',

      contrastText: '#fff',

    },

  },

  typography: {

    useNextVariants: true,

  },

});

// let authenticated=false




class App extends Component {
  render(){

    

    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store} >

          <Router>
      
            <Navbar />
            <div className='container'>
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
                <AuthRoute exact path="/logout" loggingOut={true}   />
              </Switch>
              </div>
          </Router>
          
          
          </Provider>
        </MuiThemeProvider>
    );
  }
}

export default App;

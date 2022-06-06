import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { Fragment } from 'react';
import MyButton from '../util/MyButton'
import {  Home as HomeIcon, KeyboardReturn } from '@material-ui/icons'
import PostScream from './PostScream';

import { logoutUser } from '../redux/actions/userActions';
class Navbar extends Component {
  render() {
    const { authenticated } = this.props

    return (
      <div>
          <AppBar >
                <Toolbar className="nav-container">
                  {authenticated ? (
                    <Fragment>
                      {/* <MyButton tip="Post a scream">
                        <AddIcon color="primary"/>

                      </MyButton>

                       */}

                       <PostScream />
                      <Link to="/">
                        <MyButton tip="home">
                          <HomeIcon color="primary"/>

                        </MyButton>
                      </Link>
                      
                      {/* <Link to="/logout"> */}
                        <MyButton onClick={()=>this.props.logoutUser()} tip="logout">
                          <KeyboardReturn color="primary"/>

                        </MyButton>
                      {/* </Link> */}

                    </Fragment>


                  ):(
                    <Fragment>
                      <Button color="inherit" component={Link} to='/'>Home</Button>
                      <Button color="inherit" component={Link} to='/login'>Login</Button>
                      <Button color="inherit" component={Link} to='/signup'>Signup</Button>
                    </Fragment>

                  )}
                </Toolbar>    
        </AppBar> 
        </div>
    );
  }
}
const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
})
export default connect (mapStateToProps, {logoutUser})(Navbar);

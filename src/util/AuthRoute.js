import React, { Component } from 'react'
import { Route , Redirect } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { SET_AUTHENTICATED  } from '../redux/types';
import { logoutUser,getUserData } from '../redux/actions/userActions';
import store from '../redux/store'
import { connect } from 'react-redux';

class  AuthRoute extends Component{

  render() {
    const {component: Component , loggingOut, ...rest }  = this.props

    // console.log('authntcted is',authenticated )

    // const token = localStorage.FBIdToken
    // let authenticated;
    // if(token) {
    //   const decodedToken = jwtDecode(token);
    //   console.log('decded tokn',decodedToken)
    //   if (decodedToken.exp * 10000 < Date.now()){
    //     window.location.href = '/login'
    //     authenticated = false 
    //   } else {
    //     authenticated = true
    //   }
    // }
    // console.log('ffrm auth rout',authenticated)


    const token = localStorage.FBIdToken
let authenticated = this.props.user.authenticated;

// console.log('in authroute authenticated is ', authenticated)
if(token) {
  const decodedToken = jwtDecode(token);
  // console.log('decded tokn',decodedToken)
  if (decodedToken.exp * 10000 < Date.now()){
    window.location.href = '/login'
    // authenticated = false 
    store.dispatch(logoutUser())
  } else {
    // authenticated = true
    store.dispatch({type: SET_AUTHENTICATED})

    axios.defaults.headers.common['Authorization'] = token
    store.dispatch(getUserData())
  }
}
else {
  // window.location.href = '/login'
  //   // authenticated = false 
    // store.dispatch(logoutUser())
}
// console.log('ffrm auth rout',authenticated)
if (loggingOut){
  // console.log('loggin out nd redirenting')
  store.dispatch(logoutUser())
}

        return (
        <Route
            {...rest}
            render={props=>authenticated === true || loggingOut ? <Redirect to='/' /> : <Component {...props} /> }
        />
    )
}

}
const mapStateToProps = state =>  ({
  user: state.user 
})
export default connect(mapStateToProps)(AuthRoute)



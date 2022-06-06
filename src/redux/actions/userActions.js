import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER } from '../types'
import axios from 'axios'

export const loginUser = (userData, history) => dispatch =>{
    dispatch({type:LOADING_UI});

    axios
    .post('/login', userData)
    .then(res=>{
        // console.log(res)
        const FBIdToken = `Bearer ${res.data.token}`
        localStorage.setItem('FBIdToken', FBIdToken)
        axios.defaults.headers.common['Authorization'] = FBIdToken
        dispatch(getUserData())
        dispatch({type: CLEAR_ERRORS})
        // this.setState({
        //     loading: false
        // })
        history.push('/')
    })
    .catch(err=>{
        // this.setState({
        //     errors: err.response.data,
        //     loading: false
        // })
        dispatch({
            type: SET_ERRORS,
            payload: err.response ? err.response.data : err
        })
        console.log('in login error', err)
    })
}


export const signupUser = (newUserData, history) => dispatch =>{
    dispatch({type:LOADING_UI});

    axios
    .post('/signup', newUserData)
    .then(res=>{
        // console.log(res)
        const FBIdToken = `Bearer ${res.data.token}`
        localStorage.setItem('FBIdToken', FBIdToken)
        axios.defaults.headers.common['Authorization'] = FBIdToken
        dispatch(getUserData())
        dispatch({type: CLEAR_ERRORS})
        // this.setState({
        //     loading: false
        // })
        history.push('/')
    })
    .catch(err=>{
        // this.setState({
        //     errors: err.response.data,
        //     loading: false
        // })
        dispatch({
            type: SET_ERRORS,
            payload: err.response ? err.response.data : err
        })
        console.log('in singup actions error', err)
    })
}

export const logoutUser =() => dispatch => {
    localStorage.removeItem('FBIdToken')
    delete axios.defaults.headers.common['Authorization']
    dispatch({type: SET_UNAUTHENTICATED})
}
export const getUserData = () => dispatch => {
    dispatch({type: LOADING_USER})
    axios.get('/user')
        .then(res=>{
            // console.log('   get user res', res.data)
            dispatch({
                type: SET_USER,
                payload: res.data
            })
        })
        .catch(err=>{
            console.log('get user action error', err)
        })
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
      .post('/user', userDetails)
      .then(() => {
        dispatch(getUserData());
      })
      .catch((err) => console.log(err));
  };

  
export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
      .post('/uploadImage', formData)
      .then(() => {
        dispatch(getUserData());
      })
      .catch((err) => console.log(err));
  };
  
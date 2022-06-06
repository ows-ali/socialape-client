import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Button, CircularProgress } from '@material-ui/core';

import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const AppIcon = './ape.png'


const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
        margin : '20px auto 20px auto',
        width: 50,
    },
    pageTitle: {
        margin : '10px auto 10px auto',

    },
    textField: {
        margin : '10px auto 10px auto',

        // margin: '10'
    },
    button: {
        marginTop: 20,
        position: 'relative'
    },
    progress: {
        position: 'absolute'
    },
    customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
    }
}

class Signup extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle:'',
         //   loading: false,
            errors: {},
            // loading:
        }
    }
    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })
        }
    }
    handleSubmit = event => {
        console.log ('form submit')
        event.preventDefault() 
        this.setState({
            loading:true
        })
        const userData = {
            email : this.state.email,
            password : this.state.password,
            confirmPassword : this.state.confirmPassword,
            handle: this.state.handle
        }
        this.props.signupUser(userData,this.props.history)
        // axios
        //     .post('/signup', userData)
        //     .then(res=>{
        //         console.log(res)
        //         localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
        //         this.setState({
        //             loading: false
        //         })
        //         this.props.history.push('/')
        //     })
        //     .catch(err=>{
        //         this.setState({
        //             errors: err.response.data,
        //             loading: false
        //         })
        //         console.log('in signup error', err)
        //     })

    }
    render() {
        const { classes , UI : {loading}} = this.props
        const { errors } = this.state
        return (
            <Grid container className={classes.form} >
                <Grid item sm />
                <Grid item sm >
                    <img src={AppIcon} alt='monkey' className={classes.image} />
                    <Typography variant="h2" className={classes.pageTitle}>Signup</Typography>
                    <form noValidate onSubmit={this.handleSubmit} >
                        <TextField id='email' name='email' type='email' label='Email' className={classes.textField}
                            value={this.state.email} onChange={this.onChange} helperText={errors.email} error={errors.email ? true : false} fullWidth />
                        <TextField id='password' name='password' type='password' label='Password' className={classes.textField}
                            value={this.state.password} onChange={this.onChange} helperText={errors.password} error={errors.password ? true : false}  fullWidth />
                        <TextField id='confirmPassword' name='confirmPassword' type='password' label='Confirm Password' className={classes.textField}
                            value={this.state.confirmPassword} onChange={this.onChange} helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false}  fullWidth />
                        <TextField id='handle' name='handle' type='text' label='Handle' className={classes.textField}
                            value={this.state.handle} onChange={this.onChange} helperText={errors.handle} error={errors.handle ? true : false}  fullWidth />
                        
                        {errors.general && <Typography variant='body2' className={classes.customError} >{errors.general} </Typography> }
                        <Button disabled={loading} type='submit' variant='contained' color='primary' className={classes.button}>Signup{loading && <CircularProgress size={30} className={classes.progress} />}</Button>
                        <br />
                        <small >Alreayd have an account? Login <Link to="/login" >here</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}

const mapStateToProps = state =>({
    user: state.user,
    UI: state.UI
})

export default connect(mapStateToProps, {signupUser}) (withStyles(styles)(Signup));

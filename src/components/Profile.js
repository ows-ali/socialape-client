import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/styles';

import { Link } from 'react-router-dom';

//mui stuff
import { Button, Link as MuiLink , Typography, } from '@material-ui/core';
// import { LocationOn  }  from '@material-ui/core/icon'
// import LinkIcon from '@material-ui/icons/Link'
// import LocationOn from '@material-ui/icons/LocationOn'
import { CalendarToday, LocationOn, Link as LinkIcon , KeyboardReturn , Edit as EditIcon} from '@material-ui/icons'
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import { logoutUser , uploadImage} from '../redux/actions/userActions'

import dayjs from 'dayjs';
import EditDetails from './EditDetails.js';

import MyButton from '../util/MyButton';
const styles = theme=> ({
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: theme.palette.primary.main
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
})

class Profile extends Component {

  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };
  render() {
    const { classes , user:  {
      credentials: {handle, createdAt, imageUrl, bio, website, location },
      loading,
      authenticated }
    }  = this.props

    let profileMarkup = !loading ? (authenticated ? (
      <Paper className={classes.paper} >
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image"></img>
            <input
                type="file"
                id="imageInput"
                hidden="hidden"
                onChange={this.handleImageChange}
              />
              <MyButton
                tip="Edit profile picture"
                onClick={this.handleEditPicture}
                btnClassName="button"
              >
                <EditIcon color="primary" />
              </MyButton>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink  color='primary' variant="h5" >@{handle}</MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography> }
            <hr />
            {location && 
            <Fragment>
              <LocationOn color="primary"  /><span>{location}</span>
            </Fragment>
 
            }
            <hr />
            {website && 
            <Fragment>
              <LinkIcon color="primary"  /><span><a href={website} target="_blank" rel="noreferrer" >{' '} {website}</a></span>
            </Fragment>
 
            }
            <hr />

            <CalendarToday color='primary' /> {' '}
            <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
          </div>

          <MyButton tip="Logout" onClick={this.props.logoutUser}>
              <KeyboardReturn color="primary" />
            </MyButton>
{/* 
          <Tooltip title="Logout" placement="top">
            <IconButton onClick={()=>{this.props.logoutUser()}}>
              <KeyboardReturn color="primary"></KeyboardReturn>
            </IconButton>
          </Tooltip> */}
          <EditDetails  />
        </div>
      </Paper>
    ) : (
    <Paper className={classes.paper}>
      <Typography variant="body2" align="center">
        No profile found, please login again
      </Typography>
      <div className={classes.buttons}>
        <Button variant="contained" color="primary" component={Link} to="/login">Login</Button> 
        <Button variant="contained" color="secondary" component={Link} to="/signup">Signup</Button> 
      </div>
    </Paper>) ) : (<p>Loading...</p>)
    return profileMarkup
  }
}
const mapstateToProps = state => ({
  user: state.user
})
const mapActions =  {
  logoutUser,//() => dispatch({type: LOGOUT_USER}),
  uploadImage
}
export default connect(mapstateToProps, mapActions)(withStyles(styles)(Profile));

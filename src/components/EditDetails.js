import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
// import MyButton from '../util/MyButton';
// Redux stuff
import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';
// MUI Stuff
import { Tooltip, IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Icons
import EditIcon from '@material-ui/icons/Edit';

// const styles = (theme) => ({
//   ...theme,
//   button: {
//     float: 'right'
//   }
// });


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


class EditDetails extends Component {

  constructor(props){
    super(props)
    this.mapUserDetailsToState = this.mapUserDetailsToState.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      bio: '',
      website: '',
      location: '',
      open: false
    
    }

  }
  
  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : ''
    });
  };
  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location
    };
    this.props.editUserDetails(userDetails);
    this.handleClose();
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment >
        {/* <MyButton
          tip="Edit Details"
          onClick={this.handleOpen}
          btnClassName={classes.button}
        >
          <EditIcon color="primary" />
        </MyButton> */}

        
        <Tooltip style={{float:'right'}} title="Edit" placement="bottom">
            <IconButton onClick={()=>{this.handleOpen()}}>
                <EditIcon color="primary" />
            </IconButton>
          </Tooltip>
          {/* <Button onClick={this.handleOpen}>Edit</Button> */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                tpye="text"
                label="Bio"
                multiline
                rows="3"
                placeholder="A short bio about yourself"
                className={classes.textField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="website"
                tpye="text"
                label="Website"
                placeholder="Your personal/professinal website"
                className={classes.textField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="location"
                tpye="text"
                label="Location"
                placeholder="Where you live"
                className={classes.textField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

// EditDetails.propTypes = {
//   editUserDetails: PropTypes.func.isRequired,
//   classes: PropTypes.object.isRequired
// };

const mapStateToProps = (state) => ({
  credentials: state.user.credentials
});

export default connect(
  mapStateToProps,
  { editUserDetails }
)(withStyles( styles)(EditDetails));


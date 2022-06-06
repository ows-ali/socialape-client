import React, { Component } from 'react';
import { Card, CardContent, CardMedia } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import { Chat as ChatIcon, Favorite as FavoriteIcon, FavoriteBorder } from '@material-ui/icons'
import { likeScream, unlikeScream } from '../redux/actions/dataActions';
import ScreamDialog from './ScreamDialog';
import DeleteScream from './DeleteScream';
import MyButton
 from '../util/MyButton';
const styles = {
    card: {
        display: 'flex',
        marginBottom: 20,

    },
    image: {
        minWidth: 200
    },
    content: {
        // padding: 250,
        // objectFit: 'cover'
    }
}

class Scream extends Component {
  constructor(props){
    super(props)
    this.state = {
      screams: this.props.data.screams
    }
  }
  // static getDerivedStateFromProps(props, state) {
  //   console.log('in scream comp')
  //   if (props.data.screams !== state.screams) {
  //     console.log('in scream comp cond')
  //     this.forceUpdate()

  //     return {
  //       sreams: props.screams,
  //     };
  //   }

  //   // Return null if the state hasn't changed
  //   return null;
  // }

  
   componentWillReceiveProps(nextProps){
      // console.log('in scream comp')
      

      if (nextProps.data.screams !==this.state.screams ){
        // console.log('in scream comp cond')
    
        // console.log('in condition')
        this.setState({
          screams: nextProps.data.screams
        })
        // this.childRef.current.forceUpdate()
        this.forceUpdate()
      }
    }
    likedScream = (screamId) => {
        if (
          this.props.user.likes &&
          this.props.user.likes.find(
            (like) => like.screamId === screamId
          )
        )
          return true;
        else return false;
      };
    //   likeScream = () => {
    //     this.props.likeScream(this.props.screamId);
    //   };
    //   unlikeScream = () => {
    //     this.props.unlikeScream(this.props.screamId);
    //   };
    // componentWillReceiveProps(nextProps) {
    //   console.log('in scream comp receive prop screamjs', nextProps)
    //   if (nextProps.data.screams != this.state.screams){
    //     this.forceUpdate()
    //   }
    // }
    render() {
      dayjs.extend(relativeTime)
      const { classes , user : {authenticated, credentials: {handle}}, scream : {body, createdAt, userImage, userHandle, screamId, likeCount, commentCount }} = this.props
        // console.log('scream idd',screamId)
      
      const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
      ) : null;
      let userImg=userImage

        return (
        <Card className={classes.card}>
            <CardMedia
                image={userImg}
                title="Profile Image"
                className={classes.image}
                />
            <CardContent className={classes.content}>
                <Typography 
                    variant='h5' 
                    // component={Link} 
                    // to={`/users/${userHandle}`}
                    color='primary'
                >{userHandle}</Typography>
                <Typography variant='body2' color="textSecondary" >{dayjs(createdAt).fromNow()}</Typography>
                <Typography variant='body1'>{body}</Typography>
                {!authenticated ? (
                    <Link to="/login">
                        <MyButton tip="Like">
                        <FavoriteBorder color="primary" />
                        </MyButton>
                    </Link>
                    ) : this.likedScream(screamId) ? (
                    <MyButton tip="Undo like" onClick={()=>this.props.unlikeScream(screamId)}>
                        <FavoriteIcon color="primary" />
                    </MyButton>
                    ) : (
                    <MyButton tip="Like" onClick={()=>this.props.likeScream(screamId)}>
                        <FavoriteBorder color="primary" />
                    </MyButton>
                )}
                <span>{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
                <MyButton tip="comments">
                    <ChatIcon color="primary" />
                </MyButton>
                <span>{commentCount} {commentCount===1 ? 'Comment' : 'Comments'}</span>
                {deleteButton}
                      {authenticated && 
                <ScreamDialog
                    screamId={screamId}
                    userHandle={userHandle}
                    openDialog={this.props.openDialog}
                />
                      }
            </CardContent>
        </Card>

);
  }
}


const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data
  });
  const mapActionsToProps = {
    likeScream,
    unlikeScream
  };
  export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(Scream));
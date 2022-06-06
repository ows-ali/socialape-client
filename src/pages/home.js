import React, { Component } from 'react';
import Grid  from '@material-ui/core/Grid';

import Scream from '../components/Scream';
import Profile from '../components/Profile';
import { getScreams } from '../redux/actions/dataActions';

import { connect } from 'react-redux';
class home extends Component {
    constructor(props){

        super(props)
        this.state = {
          screams: []

        }
        this.childRef = React.createRef();

    }


      // componentWillReceiveProps(nextProps){
      //   console.log('in will reeive',nextProps)


      //   if (nextProps.data.screams){
      //     console.log('in condition')
      //     this.setState({
      //       screams: nextProps.data.screams
      //     })
      //     // this.childRef.current.forceUpdate()
      //   }
      // }
    static getDerivedStateFromProps(props, state) {
      // console.log('in deviced state from props')
      if (props.data !== state.data) {
        // console.log('ddddd')
        return {
          screams: props.data.screams,
        };
      }
  
      // Return null if the state hasn't changed
      return null;
    }
    componentDidMount(){
      this.props.getScreams()
        // axios
        // .get('/screams')
        // .then(res=>{
        //     console.log(res)
        //     this.setState({
        //         screams: res.data
        //     })
        // })
        // .catch(err=>{
        //     console.log('in err ', err)
        // })
    }

  render() {
    // const screams = this.state.screams
    // console.log  
    console.log('rendering again')
    
    const {  loading } = this.props.data;
      let scr = !loading ? (this.state.screams.map(scream=>{
         return  (
        //  <p key={scream.screamId}>{scream.body}</p>
        <Scream  ref={this.childRef} scream={scream} key={scream.screamId} />
        )
      })) : 'Loading...'
    return (

      <Grid container spacing={2}>
          <Grid item sm={8} xs={12}><div>{scr}</div></Grid>
          <Grid item sm={4} xs={12}><Profile ></Profile></Grid>
      </Grid>
    );
  }
}
const mapStateToProps = (state) => ({
  data:state.data,
})

export default connect(mapStateToProps,{getScreams})(home);

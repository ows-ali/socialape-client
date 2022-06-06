import {
    SET_SCREAMS,
    LIKE_SCREAM,
    UNLIKE_SCREAM,
    LOADING_DATA,
    DELETE_SCREAM,
    POST_SCREAM,
    SET_SCREAM,
    SUBMIT_COMMENT
  } from '../types';
  
  const initialState = {
    screams: [],
    scream: {},
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case LOADING_DATA:
        return {
          ...state,
          loading: true
        };
      case SET_SCREAMS:
        return {
          ...state,
          screams: action.payload,
          loading: false
        };
      case SET_SCREAM:
        return {
          ...state,
          scream: action.payload
        };
      case LIKE_SCREAM:
      case UNLIKE_SCREAM:
        let index = state.screams.findIndex(
          (scream) => scream.screamId === action.payload.screamId
        );
        state.screams[index] = action.payload;
        if (state.scream.screamId === action.payload.screamId) {
          state.scream = action.payload;
        }
        return {
          ...state
        };
      case DELETE_SCREAM:
        // console.log('in del red')
        // console.log(action.payload)


        let ind = state.screams.findIndex(
  
          (scream) => scream.screamId === action.payload
        );
        // console.log(ind)
        
        state.screams.splice(ind , 1);
        return {
          ...state
        };
      case POST_SCREAM:
        return {
          ...state,
          screams: [action.payload, ...state.screams]
        };
      case SUBMIT_COMMENT:
        console.log('in com red before', state.screams)
        
        
        // let target = state.screams.filter(scream=>{

        //   if (scream.screamId == state.scream.screamId) {
        //       return true
        //   }
        //   return false 
        // })
        // console.log('tt',target)
        // target[0].commentCount=target[0].commentCount+1
        // console.log('tt updted',target)

        // let others = state.screams.filter(scream=>{

        //   if (scream.screamId != state.scream.screamId) {
        //       return true
        //   }
        //   return false 
        // })

        // console.log('all others bfre', others)
        // others =[...target,...others,]
        // console.log('in others uupdated', others)


        //  others = state.screams.map(scream=>{

        //   if (scream.screamId == state.scream.screamId) {
        //       scream.commentCount=scream.commentCount+1
        //   }
        //   return scream 
        // })
        let others = []
        state.screams.forEach(element => {
          if (element.screamId === state.scream.screamId) {
            element.commentCount=element.commentCount+=1
          }
          others = [...others, element]
        });
        // console.log('final others', others)

        return {
          ...state,
          screams : others,
          scream: {
            ...state.scream,
            comments: [action.payload, ...state.scream.comments]
          },
        };
      default:
        return state;
    }
  }
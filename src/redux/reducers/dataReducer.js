import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
  SUBMIT_COMMENT,
  DELETE_COMMENT,
} from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false,
  comments: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      var index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_SCREAM:
      index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload
      );
      state.screams.splice(index, 1);
      return {
        ...state,
      };
    case DELETE_COMMENT:
      index = state.comments.findIndex(
        (comment) => comment.commentId === action.payload
      );
      state.comments.splice(index, 1);
      return {
        ...state,
      };
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };
    //I've found a way - you have to make a deep copy of the screams list,
    //update the comment count, and then spread it in the returned state.
    //The reason why you have to do this is that Redux will re -
    //render components only if the state is updated.If you pass an array,
    //it will compare only the references, not the included objects,
    //so if you didn't pass a new array, it won't consider the state updated.
    //The reason everything worked with "likeCount" increments is because an
    //object gets to be updated, so Redux recognizes that it was changed.
    //That's my understanding so far, at least.

    case SUBMIT_COMMENT:
      index = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      /////// Looks for the scream, just like in "like" and "unlike" reducers
      let updatedScreams = JSON.parse(JSON.stringify(state.screams));
      ///// deep copy of the array - simply spreading it won't work
      updatedScreams[index].commentCount += 1;
      return {
        ...state,
        screams: updatedScreams,
        scream: {
          ...state.scream,
          comments: [action.payload.comment, ...state.scream.comments],
          commentCount: state.scream.commentCount + 1,
        },
      };
    default:
      return state;
  }
}

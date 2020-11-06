import { GET_ALL_POSTS, GET_POST, CREATE_POST, DELETE_POST, UPDATE_LIKE, ADD_COMMENT, DELETE_COMMENT } from '../action/Types';
const initialState = {
  posts: [],
  post: {},
  isLoading: true
};

const post = (state = initialState, { type, payload }) => {
  switch(type){
    case GET_ALL_POSTS: {
      return {
        ...state,
        isLoading: false,
        posts: [...payload]
      }
    }
    case GET_POST: {
      return{
        ...state,
        isLoading: false,
        post: payload
      }
    }
    case CREATE_POST: {
      return {
        isLoading: false,
        posts: [payload, ...state.posts]
      }
    }
    case DELETE_POST:  {
      return {
        ...state,
        posts: [...state.posts.filter(post => post._id !== payload)]
      }
    }
    case UPDATE_LIKE:{
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        isLoading: false
      };
    }
    case ADD_COMMENT: {
      const post = state.post;
      post.comments = payload;
      return {
        ...state,
        isLoading: false,
        post: {...post}
      }
    }
    case DELETE_COMMENT: {
      
      const post = state.post;
      post.comments = post.comments.filter(comment => comment._id !== payload)
      return{
        ...state,
        post: {...post}
      }
    }
    default : return {...state}
  }
}
export default post;
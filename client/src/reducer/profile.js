import { GET_PROFILE, GET_PROFILES, PROFILE_ERROR, UPDATE_PROFILE, GET_REPOS } from '../action/Types'
const initialState = {
  profile: {},
  profiles: [],
  isLoading: true,
  repos: []
}
const profile = (state = initialState, { type, payload }) => {
  switch(type){
    case GET_PROFILE: {
      return{
        ...state,
        isLoading: false,
        profile: payload
      }
    }
    case GET_PROFILES: {
      return{
        ...state,
        isLoading: false,
        profiles: payload
      }
    }
    case UPDATE_PROFILE: {
      return {
        ...state,
        isLoading: false,
        profile: payload
      }
    }
    case PROFILE_ERROR: {
      return{
        ...state,
        isLoading: false,
        profile: {},
        profiles: [],
      }
    }
    case GET_REPOS: {
      return{
        ...state,
        isLoading: false,
        repos: [...payload]
      }
    }
    default: return state;
  }
}
export default profile;
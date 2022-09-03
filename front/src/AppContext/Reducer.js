import {
  GET_USERS,
  GET_PROFILE,
  GET_PROFILE_DETAILS,
  SELECT_BG,
  LOGOUT,
} from "./Types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
      };
    case GET_PROFILE_DETAILS:
      return {
        ...state,
        profileDetails: payload,
      };
    case SELECT_BG:
      return {
        ...state,
        bgSelected: payload,
      };
    case LOGOUT:
      return {
        ...state,
        profile: { sesion: false },
        profileDetails: [],
        users: [],
        bgSelected: 0,
      };
    default:
      return state;
  }
};

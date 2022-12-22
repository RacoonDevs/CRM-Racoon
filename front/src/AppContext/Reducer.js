import {
  SET_BG,
  GET_SIGNIN,
  GET_SIGNUP,
  GET_LOGOUT,
  GET_CREATE_TEAM,
} from "./Types";

export default (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case GET_SIGNIN:
      return {
        ...state,
        user: payload,
      };
    case GET_SIGNUP:
      return {
        ...state,
        user: payload,
      };
    case SET_BG:
      return {
        ...state,
        bgSelected: payload,
      };
    case GET_CREATE_TEAM:
      return {
        ...state,
        team: payload,
      };
    case GET_LOGOUT:
      return {
        ...state,
        user: [],
        team: [],
        employees: [],
        bgSelected: 0,
      };
    default:
      return state;
  }
};

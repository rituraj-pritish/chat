import { AUTH_ERROR, AUTH_SUCCESS, SIGNOUT } from 'contexts/types';

export default (state, { type, payload }) => {
  switch (type) {
    case SIGNOUT:
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload,
      };
    default:
      return state;
  }
};

import {
  SET_USERS,
  SET_CHAT_MESSAGES,
  CLEAR_CHAT_MESSAGES,
} from 'contexts/types';

export default (state, { type, payload }) => {
  switch (type) {
    case SET_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case SET_CHAT_MESSAGES:
      return {
        ...state,
        chatMessages: payload,
        loading: false,
      };
    case CLEAR_CHAT_MESSAGES:
      return {
        ...state,
        chatMessages: [],
        loading: false,
      };
    default:
      return state;
  }
};

import React, { useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

import {
  SET_USERS,
  SET_CHAT_MESSAGES,
  CLEAR_CHAT_MESSAGES,
} from 'contexts/types';
import AuthContext from 'contexts/auth/AuthContext';
import { db } from 'firebase-config/firebase';
import UserContext from './UserContext';
import userReducer from './userReducer';

const UserState = ({ children }) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  let currentUser;
  if (user) currentUser = user.uid;

  const initialState = {
    users: [],
    loading: true,
    chatMessages: [],
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  const chatId = (sender, reciever) => {
    return sender < reciever ? sender + reciever : reciever + sender;
  };

  const getUsers = async () => {
    try {
      await db.collection('users').onSnapshot((data) => {
        const users = data.docs.map((doc) => doc.data());

        const usersExceptCurrentUser = users.filter(
          (el) => el.uid !== currentUser,
        );

        dispatch({ type: SET_USERS, payload: usersExceptCurrentUser });
      });
    } catch (err) {}
  };

  const getChat = (reciever) => {
    db.collection('chats')
      .doc(chatId(currentUser, reciever))
      .collection('messages')
      .orderBy('date')
      .onSnapshot((snap) => {
        const messages = snap.docs.map((doc) => doc.data());

        dispatch({ type: SET_CHAT_MESSAGES, payload: messages });
      });
  };

  const clearChat = () => dispatch({ type: CLEAR_CHAT_MESSAGES });

  const sendMessage = (reciever, message) => {
    db.collection('chats')
      .doc(chatId(currentUser, reciever))
      .collection('messages')
      .add({ message, author: currentUser, date: Date.now() });
  };

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        messages: state.chatMessages,
        loading: state.loading,
        getUsers,
        sendMessage,
        getChat,
        clearChat,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserState.propTypes = {
  children: PropTypes.element.isRequired,
};

export default UserState;

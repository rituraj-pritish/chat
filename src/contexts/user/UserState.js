import React, { useReducer, useContext } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

import {
  SET_USERS,
  SET_CHAT_MESSAGES,
  CLEAR_CHAT_MESSAGES,
  SET_LOADING,
} from 'contexts/types';
import { db, storage } from 'firebase-config/firebase';
import AuthContext from 'contexts/auth/AuthContext';
import UserContext from './UserContext';
import userReducer from './userReducer';

const UserState = ({ children }) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  let currentUser;
  if (user) currentUser = user.uid;

  const initialState = {
    users: [],
    filesUploadProgress: null,
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
          (item) => item.uid !== currentUser,
        );

        dispatch({ type: SET_USERS, payload: usersExceptCurrentUser });
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getChat = async (reciever) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      await db
        .collection('chats')
        .doc(chatId(currentUser, reciever))
        .collection('messages')
        .orderBy('date')
        .onSnapshot((snap) => {
          const messages = snap.docs.map((doc) => doc.data());

          dispatch({ type: SET_CHAT_MESSAGES, payload: messages });
        });
    } catch (err) {
      console.log(err);
    }
  };

  const clearChat = () => dispatch({ type: CLEAR_CHAT_MESSAGES });

  const sendMessage = async (reciever, message) => {
    const id = chatId(currentUser, reciever);
    const messagesRef = db
      .collection('chats')
      .doc(id)
      .collection('messages');

    try {
      const res = await messagesRef.add({
        message,
        author: currentUser,
        date: Date.now(),
        uid: uuid(),
      });

      if (res.id) await messagesRef.doc(res.id).update({ uid: res.id });
    } catch (err) {
      console.log(err);
    }
  };

  const sendFiles = (reciever, files) => {
    const storageRef = storage.ref('files');

    files.map(async (file) => {
      const id = uuid();

      try {
        await storageRef
          .child(id)
          .put(file)
          .then(() => {
            storageRef
              .child(id)
              .getDownloadURL()
              .then((url) => {
                if (file.type.split('/')[0] === 'image') {
                  sendMessage(reciever, {
                    type: 'image',
                    fileName: file.name,
                    url,
                  });
                } else {
                  sendMessage(reciever, {
                    type: 'document',
                    fileName: file.name,
                    url,
                  });
                }
              });
          });

        // .on('state_changed', (snap) => {
        //   const progress = (snap.bytesTransferred / snap.totalBytes) * 100;

        //   dispatch({ type: SET_FILES_UPLOAD_PROGRESS, payload: progress });

        //   if (progress === 100) {
        //     storageRef
        //       .child(id)
        //       .getDownloadURL()
        //       .then((url) => {
        //         if (file.type.split('/')[0] === 'image') {
        //           sendMessage(reciever, {
        //             type: 'image',
        //             fileName: file.name,
        //             url,
        //           });
        //         } else {
        //           sendMessage(reciever, {
        //             type: 'document',
        //             fileName: file.name,
        //             url,
        //           });
        //         }
        //       });
        //   }
        // });
      } catch (err) {
        console.log(err);
      }
    });
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
        sendFiles,
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

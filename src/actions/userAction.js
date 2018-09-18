import axios from 'axios';
export const SIGN_UP = 'SIGN_UP';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';
export const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';
export const SEARCH = 'SEARCH';
const serverROOT = 'https://sc-back.herokuapp.com';
// const serverROOT = 'http://localhost:5000';

export const signOut = (history) => {
  localStorage.removeItem('user');
  history.push('/login');
  return ({ type: LOGGED_OUT });
}

export const signUp = (newUser, history) => {
  console.log('USER SIGNING UP', newUser);
  if(newUser.name !== '' || newUser.email !== '' || newUser.password !== ''){
    return (dispatch) => {
      dispatch({
        type: 'SIGNING_UP'
      });
      axios.post(`${serverROOT}/user/signup`, newUser)
      .then(res => {
        if(res.status === 200){
          localStorage.setItem('user', JSON.stringify(res.data));
          dispatch({
              type: LOGGED_IN,
              payload: res.data
          });
          history.push('/');
        }
      });
    }
  }
}

export const signIn = (user, history) => {
  if(user.name !== '' || user.password !== ''){
    return (dispatch) => {
      dispatch({
        type: 'LOGGING_IN'
      });
      axios.post(`${serverROOT}/user/login`, user)
      .then(res => {
        if(res.status === 200){
          localStorage.setItem('user', JSON.stringify(res.data));
          dispatch({
            type: LOGGED_IN,
            payload: res.data
          });
          history.push('/');       
        }
      });
    }
  }
}

export const saveGoal = (goal, history) => {
    return (dispatch) => {
      axios.put(`${serverROOT}/user/addGoal`, goal)
      .then(res => {
        if(res.status === 200){
          localStorage.setItem('user', JSON.stringify(res.data));
          dispatch({
            type: 'SAVED_GOAL',
            payload: res.data
          });
          history.push('/');       
        }
      });
    }
}



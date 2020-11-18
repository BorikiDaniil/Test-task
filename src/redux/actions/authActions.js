import * as firebase from 'firebase'
import { AUTHENTICATE, SIGN_UP, BUTTON_LOGIN, FAILED_AUTH} from '../types';

const register = (email, password) => {
  return async dispatch => {
    dispatch({type: BUTTON_LOGIN, payload: true})
    try {
      const response = await firebase.default.auth().createUserWithEmailAndPassword(email, password)
      dispatch({type: AUTHENTICATE, payload: {token: response.user.refreshToken}})
      localStorage.setItem('token', response.user.refreshToken)
      dispatch({type: BUTTON_LOGIN, payload: false})
      dispatch({type: FAILED_AUTH, payload: ''})
    } catch (e) {
      dispatch({type: FAILED_AUTH, payload: e.message})
      dispatch({type: BUTTON_LOGIN, payload: false})
    }
  }
};

const login = (email, password) => {
  return async dispatch => {
    dispatch({type: BUTTON_LOGIN, payload: true})
    try {
      const response = await firebase.default.auth().signInWithEmailAndPassword(email, password)
      dispatch({type: AUTHENTICATE, payload: { token: response.user.refreshToken}})
      dispatch({type: BUTTON_LOGIN, payload: false})
      localStorage.setItem('token', response.user.refreshToken)
      dispatch({type: FAILED_AUTH, payload: ''})
    }
    catch (e) {
      dispatch({type: FAILED_AUTH, payload: e.message})
      dispatch({type: BUTTON_LOGIN, payload: false})
    }
  }
};

const signUp = () => {
  return async (dispatch) => {
    await firebase.default.auth().signOut()
    localStorage.removeItem("token");
    dispatch({type: SIGN_UP})
  }
};


export {
  register,
  login,
  signUp
}

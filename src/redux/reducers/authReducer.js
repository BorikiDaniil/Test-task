import { AUTHENTICATE, SIGN_UP, BUTTON_LOGIN, FAILED_AUTH } from '../types';

const initialState = {
  token: null,
  loginBtnLoading: false,
  error: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return Object.assign({}, state, { token: action.payload.token,});
    case SIGN_UP:
      return { token: null};
    case BUTTON_LOGIN:
      return Object.assign({}, state, { loginBtnLoading: action.payload });
    case FAILED_AUTH:
      return Object.assign({}, state, { error: action.payload });
    default:
      return state;
  }
};

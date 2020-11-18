import {LIST} from '../types';

const initialState = {
  products: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LIST:
      return Object.assign({}, state, {
        products: action.payload
      });
    default:
      return state;
  }
};

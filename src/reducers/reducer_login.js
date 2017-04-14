import { LOGIN_SUCCESS,
         SIGN_OUT
      } from '../actions';
const defaultStatus = {
  success: false,
  xAuth: 'default2'
};

export default function (state = defaultStatus, action) {
  console.log('call me');
  if (action) {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return action.payload;
      case SIGN_OUT:
        console.log('sign out');
        return action.payload;
      default:
        return state;
    }
  }
  return state;
}

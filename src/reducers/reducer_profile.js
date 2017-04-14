import { SET_PROFILE } from '../actions';

export default function (state = null, action) {
  if (action) {
    switch (action.type) {
      case SET_PROFILE:
        return action.payload;
      default:
        return {};
    }
  }
  return state;
}

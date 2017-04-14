import { REGISTER, REGISTERED } from '../actions';
const defaultStatus = {
  regStatus: false
};
export default function (state = defaultStatus, action) {
  if (action) {
    switch (action.type) {
      case REGISTER:
        return Object.assign({}, state, action.payload);
      case REGISTERED:
        return Object.assign({}, state, action.payload);
      default:
        return state;
    }
  }
  return state;
}

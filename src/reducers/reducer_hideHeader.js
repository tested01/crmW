//HIDE_HEADER
import { HIDE_HEADER
      } from '../actions';
const defaultStatus = {
  hide: false
};

export default function (state = defaultStatus, action) {
  if (action) {
    switch (action.type) {
      case HIDE_HEADER:
        return action.payload;
      default:
        return state;
    }
  }
  return state;
}

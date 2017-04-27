import { CURRENT_COURSE
      } from '../actions';
const defaultStatus = {
  code: ''
};

export default function (state = defaultStatus, action) {
  if (action) {
    switch (action.type) {
      case CURRENT_COURSE:
        return action.payload;
      default:
        return state;
    }
  }
  return state;
}

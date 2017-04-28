import { COURSE_OPERATION
      } from '../actions';
const defaultStatus = {
  open: false
};

export default function (state = defaultStatus, action) {
  console.log('courseOperation', state, action);
  if (action) {
    switch (action.type) {
      case COURSE_OPERATION:
        return action.payload;
      default:
        return state;
    }
  }
  return state;
}

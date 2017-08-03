import { UPDATE_COURSE_CONTEXT} from '../actions';
const defaultStatus = {
};

export default function (state = defaultStatus, action) {
  if (action) {
    switch (action.type) {
      case UPDATE_COURSE_CONTEXT:
        return action.payload;
      default:
        return state;
    }
  }
  return state;
}

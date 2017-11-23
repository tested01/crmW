import { CURRENT_COURSE
      } from '../actions';
const defaultStatus = {
  code: ''
};

export default function (state = defaultStatus, action) {
  if (action) {
    switch (action.type) {
      case CURRENT_COURSE:
        let result = action.payload;
        let length = result.members.students.length;
        result.memberLength = length;
        return result;
      default:
        return state;
    }
  }
  return state;
}

import { CURRENT_MISSIONS
      } from '../actions';
const defaultStatus = [];

export default function (state = defaultStatus, action) {
  if (action) {
    switch (action.type) {
      case CURRENT_MISSIONS:
        return action.payload;
      default:
        return state;
    }
  }
  return state;
}

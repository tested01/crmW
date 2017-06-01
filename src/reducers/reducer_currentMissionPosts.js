


import { CURRENT_MISSION_POSTS
      } from '../actions';
const defaultStatus = {};

export default function (state = defaultStatus, action) {

  if (action) {
    switch (action.type) {
      case CURRENT_MISSION_POSTS:
        console.log(action, 'c mission posts~');
        return action.payload;
      default:
        return state;
    }
  }
  return state;
}

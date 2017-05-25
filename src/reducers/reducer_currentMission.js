//setCurrentMission

import { CURRENT_MISSION
      } from '../actions';
const defaultStatus = {};

export default function (state = defaultStatus, action) {

  if (action) {
    switch (action.type) {
      case CURRENT_MISSION:
        console.log(action, 'c mission ~');
        return action.payload;
      default:
        return state;
    }
  }
  return state;
}

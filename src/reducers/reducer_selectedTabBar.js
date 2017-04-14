import { TABBAR } from '../actions';

const defaultState = {
  type: TABBAR.ACTIVITY.id,
  payload: {
    code: TABBAR.ACTIVITY.id,
    title: TABBAR.ACTIVITY.text
  }
};

export default function (state, action) {
  if (action) {
    switch (action.type) {
      case TABBAR.COURSE.id:
        return action.payload;
      case TABBAR.LEARNING.id:
        return action.payload;
      case TABBAR.EXIBITION.id:
        return action.payload;
      case TABBAR.PROFILE.id:
        return action.payload;
      case TABBAR.ACTIVITY.id:
        console.log('77');
        return action.payload;
      default:
        console.log('ss');
        return defaultState.payload;
    }
  }
  return state;
}

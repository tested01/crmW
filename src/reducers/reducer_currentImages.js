import {
  ADD_IMAGES,
  EDIT_IMAGES,
  CLEAR_IMAGES
      } from '../actions';
const defaultStatus = [];

export default function (state = defaultStatus, action) {
  if (action) {
    switch (action.type) {
      case ADD_IMAGES:
        return state.concat(action.payload);
      case EDIT_IMAGES:
        return action.payload;
      case CLEAR_IMAGES:
        return [];
      default:
        return state;
    }
  }
  return state;
}

import { REGISTERNEXT, REGISTERLAST } from '../actions';
const totleRegSteps = 4;
const defaultStatus = {
  regStep: 0,
  completed: false,
  next: true,
  previous: false
};
export default function (state = defaultStatus, action) {
  if (action) {
    switch (action.type) {
      case REGISTERNEXT:
        var regStep = 0;
        var completed = false;
        var previous = false;
        if (regStep > 0){
          previous = true;
        }
        if (regStep < totleRegSteps){
          regState = state.regStep + 1;
        }else{
          regState = state.regStep;
          completed = true;
        }
        return Object.assign({}, state, {regState, completed, previous, next});
      case REGISTERLAST:
        var regStep = 0;
        var completed = false;
        var previous = false;
        if (regStep > 0){
          previous = true;
        }
        if (regStep > 0){
          regState = state.regStep - 1;
        }else{
          regState = state.regStep;
          completed = true;
        }
        return Object.assign({}, state, {regState, completed, previous, next});
      default:
        return state;
    }
  }
  return state;
}

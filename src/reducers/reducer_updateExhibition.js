import { UPDATE_EXHIBITION } from '../actions';
import { CONFIG } from '../config';

const defaultStatus = {
  posts: [],
  lastUpdate: null,
  couldUpdate: false
};

export default function (state = defaultStatus, action) {
  //requestTime
  if (action) {
    switch (action.type) {
      case UPDATE_EXHIBITION:
        let updatedState = {
          posts: []
        }

        // check if the lastUpdate null
        if(state.lastUpdate == null){
          // if the lastUpdate is null, then update and set the lastUpdate
          console.log('the lastUpdate is null, then update and set the lastUpdate');
          updatedState.lastUpdate = action.payload.requestTime;
          updatedState.couldUpdate = true;
        }else{
          // if the lastUpdate is not null, diff it with requestTime
          // if the diff is less than the threshold => no action
          let diff = action.payload.requestTime - state.lastUpdate;
          console.log('diff is : ', diff);
          // if the diff is greater than the threshold => update & set the lastUpdate
          let threshold = CONFIG.UPDATE_NEW_THRESHOLD; //5 mins as default threshold
          if(diff > threshold){
            updatedState.lastUpdate = action.payload.requestTime;
            updatedState.couldUpdate = true;
            console.log('the diff is greater than the threshold => update & set the lastUpdate');
          }else{
            console.log('update request sends too frequently');
            updatedState.lastUpdate = state.lastUpdate;
            updatedState.couldUpdate = false;

          }

        }
        return updatedState;
      default:
        return state;
    }
  }
  return state;
}

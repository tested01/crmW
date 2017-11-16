//HIDE_HEADER
import { HIDE_HEADER
      } from '../actions';
const defaultStatus = {
  hide: false,
  headerTitles: [] //hided header titles
};
/*
 when 'hide' is true, add headerTitle to the hideList
 when 'hide' is false, remove it from the hideList
*/
export default function (state = defaultStatus, action) {
  if (action) {
    switch (action.type) {
      case HIDE_HEADER:
        let hide = action.payload.hide;
        let headerTitle = action.payload.headerTitle;
        let newHeaderTitles = state.headerTitles;
        if(hide){
          //add the headerTitle to headerTitles
          // https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
          if(newHeaderTitles.includes(headerTitle)){
            // no op
          }else{
            newHeaderTitles.push(headerTitle);
          }
        }else{
          //remove the headerTitle from headerTitles
          if(newHeaderTitles.includes(headerTitle)){
            let index = newHeaderTitles.indexOf(headerTitle);
            if (index > -1) {
                newHeaderTitles.splice(index, 1);
            }
          }else{
              // no op
          }
        }
        console.log('newHeaderTitles', newHeaderTitles);
        //return action.payload;
        return {
          hide,
          headerTitles : newHeaderTitles
        }
      default:
        return state;
    }
  }
  return state;
}

import {
  ADD_NEW_TASK,
  END_ADD_NEW_TASK,
  EDIT_TASK,
  END_EDIT_TASK,
  VIEW_TASK,
  END_VIEW_TASK,
  RECOMMEND_TASK,
  END_RECOMMEND_WORK
      } from '../actions';

//states
export const O_Course_Task = 'O_Course_Task';
export const A_New_Task = 'A_New_Task';
export const B_Edit_Task = 'B_Edit_Task';
export const C_Nth_Task = 'C_Nth_Task';
export const D_Recommend_Work = 'D_Recommend_Work';

export default function (state = O_Course_Task, action) {
  if (action) {
    switch (action.type) {
      case ADD_NEW_TASK:
        if(state === O_Course_Task){
          return A_New_Task;
        }
        return state;
      case END_ADD_NEW_TASK:
        if(state === A_New_Task){
          return O_Course_Task;
        }
        return state;
      case EDIT_TASK:
        if(state === O_Course_Task){
          return B_Edit_Task;
        }
        return state;
      case END_EDIT_TASK:
        if(state === B_Edit_Task){
          return O_Course_Task;
        }
        return state;
      case VIEW_TASK:
        if(state === O_Course_Task){
          return C_Nth_Task;
        }
        return state;
      case END_VIEW_TASK:
        if(state === C_Nth_Task){
          return O_Course_Task;
        }
        return state;
      case RECOMMEND_TASK:
        if(state === C_Nth_Task){
          return D_Recommend_Work;
        }
        return state;
      case END_RECOMMEND_WORK:
        if(state === D_Recommend_Work){
          return C_Nth_Task;
        }
        return state;
      default:
        return state;
    }
  }
  return state;
}

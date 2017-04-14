import {
       REG_ROLE,
       REG_EMAIL,
       REG_PASSWORD,
       REG_FIRSTNAME,
       REG_LASTNAME,
       REG_SCHOOL,
       REG_PHONE
       } from '../actions';
const defaultStatus = {
  regStatus: false
};
export default function (state = defaultStatus, action) {
  if (action) {
    switch (action.type) {
      case REG_ROLE:
      case REG_EMAIL:
      case REG_PASSWORD:
      case REG_FIRSTNAME:
      case REG_LASTNAME:
      case REG_SCHOOL:
      case REG_PHONE:
        return Object.assign({}, state, action.payload);
      default:
        return state;
    }
  }
  return state;
}

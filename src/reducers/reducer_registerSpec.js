import {
       REG_ROLE,
       REG_EMAIL,
       REG_PASSWORD,
       REG_FIRSTNAME,
       REG_LASTNAME,
       REG_SCHOOLTYPE,
       REG_SCHOOLLEVEL,
       REG_SCHOOLNAME,
       REG_SCHOOLCITY,
       REG_PHONE,
       REG_VERIFYCODE
       } from '../actions';
const defaultStatus = {
  regStatus: false
};
export default function (state = defaultStatus, action) {
  if (action) {
    switch (action.type) {
      //case REG_ROLE:
      case REG_EMAIL:
      case REG_PASSWORD:
      case REG_FIRSTNAME:
      case REG_LASTNAME:
      case REG_SCHOOLTYPE:
      case REG_SCHOOLLEVEL:
      case REG_SCHOOLCITY:
      case REG_PHONE:
      case REG_SCHOOLNAME:
      case REG_ROLE:
      case REG_VERIFYCODE:
        return Object.assign({}, state, action.payload);
      default:
        return state;
    }
  }
  return state;
}

import { combineReducers } from 'redux';
import LoginReducer from './reducer_login';
import Profile from './reducer_profile';
import Register from './reducer_register';
import SelectedFeature from './reducer_selectedTabBar';
import RegisterStep from './reducer_regSteps';
import RegisterSpec from './reducer_registerSpec';

const rootReducer = combineReducers({
  loginState: LoginReducer,
  profile: Profile,
  register: Register,
  selectedFeature: SelectedFeature,
  registerStep: RegisterStep
});

export default rootReducer;

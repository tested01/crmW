import { combineReducers } from 'redux';
import LoginReducer from './reducer_login';
import Profile from './reducer_profile';
import Register from './reducer_register';
import SelectedFeature from './reducer_selectedTabBar';
import RegisterStep from './reducer_regSteps';
import RegisterSpec from './reducer_registerSpec';
import CurrentCourse from './reducer_currentCourse';
import CurrentMissions from './reducer_currentMissions';
import CurrentMission from './reducer_currentMission';
import CurrentMissionPosts from './reducer_currentMissionPosts';
import HideHeader from './reducer_hideHeader';
import CourseOperation from './reducer_courseOperation';
import LiteraryWorksState from './reducer_literary_works_state';

const rootReducer = combineReducers({
  loginState: LoginReducer,
  profile: Profile,
  register: Register,
  selectedFeature: SelectedFeature,
  registerStep: RegisterStep,
  registerSpec: RegisterSpec,
  currentCourse: CurrentCourse,
  currentMissions: CurrentMissions,
  hideHeaderOperation: HideHeader,
  courseOperation: CourseOperation,
  literaryWorksState: LiteraryWorksState,
  currentMission: CurrentMission,
  currentMissionPosts: CurrentMissionPosts
});

export default rootReducer;

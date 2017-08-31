
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_PROFILE = 'SET_PROFILE';
export const REGISTER = 'REGISTER';
export const REGISTERED = 'REGISTERED';
export const TABBAR = {
  COURSE: { id: 'COURSE', text: '課務' },
  LEARNING: { id: 'LEARNING', text: '學習' },
  EXIBITION: { id: 'EXIBITION', text: '展演' },
  ACTIVITY: { id: 'ACTIVITY', text: '活動' },
  NOTIFICATION: { id: 'NOTIFICATION', text: '通知'},
  PROFILE: { id: 'PROFILE', text: '我' }
};

export const CURRENT_COURSE = 'CURRENT_COURSE';
export const REGISTERNEXT = 'REGISTERNEXT';
export const REGISTERLAST = 'REGISTERLAST';

export const REG_ROLE = 'REG_ROLE';
export const REG_EMAIL = 'REG_EMAIL';
export const REG_PASSWORD = 'REG_PASSWORD';
export const REG_FIRSTNAME = 'REG_FIRSTNAME';
export const REG_LASTNAME = 'REG_LASTNAME';
export const REG_SCHOOLTYPE = 'REG_SCHOOLTYPE';
export const REG_SCHOOLLEVEL = 'REG_SCHOOLLEVEL';
export const REG_SCHOOLNAME = 'REG_SCHOOLNAME';
export const REG_SCHOOLCITY = 'REG_SCHOOLCITY';
export const REG_PHONE = 'REG_PHONE';
export const REG_VERIFYCODE = 'REG_VERIFYCODE';
export const REG_SCHOOLSLIST = 'REG_SCHOOLSLIST';

export const HIDE_HEADER = 'HIDE_HEADER';
export const COURSE_OPERATION = 'COURSE_OPERATION';
//literaryWork related actions (start)
export const ADD_NEW_TASK = 'ADD_NEW_TASK';
export const END_ADD_NEW_TASK = 'END_ADD_NEW_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const END_EDIT_TASK = 'END_EDIT_TASK';
export const VIEW_TASK = 'VIEW_TASK';
export const END_VIEW_TASK = 'END_VIEW_TASK';
export const RECOMMEND_TASK = 'RECOMMEND_TASK';
export const END_RECOMMEND_WORK = 'END_RECOMMEND_WORK';
export const SUBMIT_WORK = 'SUBMIT_WORK';
export const END_SUBMIT_WORK = 'END_SUBMIT_WORK';
//literaryWork related actions (end)

export const CURRENT_MISSIONS = 'CURRENT_MISSIONS';
export const CURRENT_MISSION = 'CURRENT_MISSION';
export const CURRENT_MISSION_POSTS = 'CURRENT_MISSION_POSTS';

export const ADD_IMAGES = 'ADD_IMAGES';
export const EDIT_IMAGES = 'EDIT_IMAGES';
export const CLEAR_IMAGES = 'CLEAR_IMAGES';

export const UPDATE_EXHIBITION = 'UPDATE_EXHIBITION';
export const UPDATE_COURSE_CONTEXT = 'UPDATE_COURSE_CONTEXT';
//export const UPDATE_EXHIBITION_POSTS = 'UPDATE_EXHIBITION_POSTS';

//SECTION: ExhibitionView update
export function updateExhibition(){

  let currentdate = new Date();
  /*
  let currentdatetime = "Request Exhibition @ "
                  + currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/"
                  + currentdate.getFullYear() + " @ "
                  + currentdate.getHours() + ":"
                  + currentdate.getMinutes() + ":"
                  + currentdate.getSeconds();
  console.log(currentdatetime);*/
  return{
    type: UPDATE_EXHIBITION,
    payload: {
      requestTime: currentdate
    }
  }
}
/*
export function updateExhibitionPosts(posts){

  return{
    type: UPDATE_EXHIBITION_POSTS,
    payload: {
      posts
    }
  }
}

*/

//SECTION: literaryWork related action creators
export function addNewTask() {
  return {
    type: ADD_NEW_TASK,
    payload: {
    }
  };
}

export function endAddNewTask() {
  return {
    type: END_ADD_NEW_TASK,
    payload: {

    }
  };
}

export function editTask() {
  return {
    type: EDIT_TASK,
    payload: {
    }
  };
}

export function endEditTask() {
  return {
    type: END_EDIT_TASK,
    payload: {
    }
  };
}

export function viewTask() {
  return {
    type: VIEW_TASK,
    payload: {
    }
  };
}


export function endViewTask() {
  return {
    type: END_VIEW_TASK,
    payload: {
    }
  };
}

export function recommendTask() {
  return {
    type: RECOMMEND_TASK,
    payload: {
    }
  };
}

export function endRecommendWork() {
  return {
    type: END_RECOMMEND_WORK,
    payload: {
    }
  };
}

export function submitWork() {
  return {
    type: SUBMIT_WORK,
    payload: {
    }
  };
}

export function endSubmitWork() {
  return {
    type: END_SUBMIT_WORK,
    payload: {
    }
  };
}

//SECTION: Register-related action creators start below
export function regRole(role) {
  return {
    type: REG_ROLE,
    payload: {
      role
    }
  };
}

export function hideHeader(hide) {
  return {
    type: HIDE_HEADER,
    payload: {
      hide
    }
  };
}

export function courseOperation(open) {
  return {
    type: COURSE_OPERATION,
    payload: {
      open
    }
  };
}



export function regEmail(email) {
  return {
    type: REG_EMAIL,
    payload: {
      email
    }
  };
}

export function regPassword(password) {
  return {
    type: REG_PASSWORD,
    payload: {
      password
    }
  };
}

export function regFirstname(firstname) {
  return {
    type: REG_FIRSTNAME,
    payload: {
      firstname
    }
  };
}

export function regLastname(lastname) {
  return {
    type: REG_LASTNAME,
    payload: {
      lastname
    }
  };
}

export function regSchoolType(schoolType) {
  return {
    type: REG_SCHOOLTYPE,
    payload: {
      schoolType
    }
  };
}

export function regSchoolCity(schoolCity) {
  return {
    type: REG_SCHOOLCITY,
    payload: {
      schoolCity
    }
  };
}

export function regSchoolLevel(schoolLevel) {
  return {
    type: REG_SCHOOLLEVEL,
    payload: {
      schoolLevel
    }
  };
}

export function regSchoolName(schoolName) {
  return {
    type: REG_SCHOOLNAME,
    payload: {
      schoolName
    }
  };
}

export function regPhone(phone) {
  return {
    type: REG_PHONE,
    payload: {
      phone
    }
  };
}

export function regVerifyCode(code){
  return {
    type: REG_VERIFYCODE,
    payload: {
      code
    }
  };
}

export function regSchoolsList(regSchoolsList){
  return {
    type: REG_SCHOOLSLIST,
    payload: {
      regSchoolsList
    }
  };
}
//SECTION: Register-related action creators end above

export function loginSuccess(success = false, xAuth, email, role, id, user) {
  // loginSuccess is an ActionCreator, it needs
  // to return an action, an object with a 'type' property

  return {
    type: LOGIN_SUCCESS,
    payload: {
      success,
      email,
      xAuth,
      role,
      id,
      user
    }
  };
}


export function signOut(success = false, xAuth) {
  // signOut is an ActionCreator, it needs
  // to return an action, an object with a 'type' property

  return {
    type: SIGN_OUT,
    payload: {
      success: false,
      xAuth
    }
  };
}

export function setProfile(profile = {}) {
  // setProfile is an ActionCreator, it needs
  // to return an action, an object with a 'type' property

  return {
    type: SET_PROFILE,
    payload: {
      profile
    }
  };
}


export function registerRequest() {
  // registerRequest is an ActionCreator, it needs
  // to return an action, an object with a 'type' property
  return {
    type: REGISTER,
    payload: {
      regStatus: true
    }
  };
}

export function registeredRequest() {
  // registerRequest is an ActionCreator, it needs
  // to return an action, an object with a 'type' property

  return {
    type: REGISTERED,
    payload: {
      regStatus: false
    }
  };
}

export function registerNextStep() {
  // registerRequest is an ActionCreator, it needs
  // to return an action, an object with a 'type' property

  return {
    type: REGISTERNEXT
  };
}

export function registerLastStep() {
  // registerRequest is an ActionCreator, it needs
  // to return an action, an object with a 'type' property

  return {
    type: REGISTERLAST
  };
}


function genericTabBarSelector(tabBarId) {
  return {
    type: tabBarId.id,
    payload: {
      code: tabBarId.id,
      title: tabBarId.text
    }
  };
}


export function selectTabBarItem(tabBar = TABBAR.ACTIVITY) {
  // selectTabBarItem is an ActionCreator, it needs
  // to return an action, an object with a 'type' property
  return genericTabBarSelector(tabBar);
}

export function setCurrentMissions(missions=[]){
  //TODO: Maybe add some check for code format
  //console.log('someone set the course code');
  return {
    type: CURRENT_MISSIONS,
    payload: missions
  };
}

export function setCurrentMission(missions={}){
  //TODO: Maybe add some check for code format
  //console.log('someone set the course code');
  return {
    type: CURRENT_MISSION,
    payload: missions
  };
}

export function setCurrentCourse(course={}){
  //TODO: Maybe add some check for code format
  //console.log('someone set the course code');
  return {
    type: CURRENT_COURSE,
    payload: course
  };
}

export function setCurrentMissionPosts(posts={}){
  //TODO: Maybe add some check for code format
  //console.log('someone set the course code');
  return {
    type: CURRENT_MISSION_POSTS,
    payload: posts
  };
}

//SECTION: photoGrid
export function addImages(images={}){
  return {
    type: ADD_IMAGES,
    payload: images
  };
}


export function editImages(images={}){
  //replace current images with images of given parameter
  return {
    type: EDIT_IMAGES,
    payload: images
  };
}


export function clearImages(){

  return {
    type: CLEAR_IMAGES
  };
}

export function updateCourseContext(){
  return {
    type: UPDATE_COURSE_CONTEXT
  };
}

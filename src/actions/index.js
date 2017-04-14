
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
  PROFILE: { id: 'PROFILE', text: '我' }
};

export const REGISTERNEXT = 'REGISTERNEXT';
export const REGISTERLAST = 'REGISTERLAST';

export function loginSuccess(success = false, xAuth) {
  // loginSuccess is an ActionCreator, it needs
  // to return an action, an object with a 'type' property

  return {
    type: LOGIN_SUCCESS,
    payload: {
      success,
      xAuth
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
  console.log('registerRequest');
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

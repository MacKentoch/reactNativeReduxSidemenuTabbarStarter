'use strict';

import moment  from 'moment';

///////////////////////
// constants
///////////////////////
const OPEN_SIDEMENU   = 'OPEN_SIDEMENU';
const CLOSE_SIDEMENU  = 'LEAVE_HOME_VIEW';
const SET_SIDEMENU_STATE = 'SET_SIDEMENU_STATE';

///////////////////////
// reducer
///////////////////////
const initialState = {
  isOpened:  false,
  time: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
  case 'OPEN_SIDEMENU':
    return {
      ...state,
      isOpened: true,
      time:     action.time,
    };
  case 'CLOSE_SIDEMENU':
    return {
      ...state,
      isOpened: false,
      time:     action.time,
    };
  case 'SET_SIDEMENU_STATE':
    return {
      ...state,
      isOpened: action.isOpened,
      time:     action.time,
    };
  default:
    return state;
  }
}


///////////////////////
// actions creators
///////////////////////
export function openSideMenu(time = moment().format()) {
  return {
    type: OPEN_SIDEMENU,
    time
  };
}

export function closeSideMenu(time = moment().format()) {
  return {
    type: CLOSE_SIDEMENU,
    time
  };
}
/*
  toggleSideMenu uses redux-thunk (example of use-case for a non async case)
   - disptach openSideMenu
   or
   - dispatch closeSideMenu
   -> depending current sidemenu.isOpened ("getState()"" to easily read state)
 */
export function toggleSideMenu(time = moment().format()) {
  return function(dispatch, getState) {
    const sideMenuIsOpened = getState().sidemenu.isOpened;
    if (sideMenuIsOpened) {
      dispatch(closeSideMenu());
    } else {
      dispatch(openSideMenu());
    }
  };
}
export function setSideMenuState(isOpened = false, time = moment().format()) {
  return {
    type: SET_SIDEMENU_STATE,
    isOpened,
    time
  };
}

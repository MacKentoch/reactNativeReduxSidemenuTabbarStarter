'use strict';

import moment  from 'moment';

///////////////////////
// constants
///////////////////////
const ENTER_DEMO_MODAL      = 'ENTER_DEMO_MODAL';
const LEAVE_DEMO_MODAL      = 'LEAVE_DEMO_MODAL';

///////////////////////
// reducer
///////////////////////
const initialState = {
  currentModal:   'not set',
  enterTime:      null
};

export default function(state = initialState, action) {

  switch (action.type) {

  case 'ENTER_DEMO_MODAL':
    if (state.currentModal !== action.currentModal) {
      return {
        ...state,
        currentModal:  action.currentModal,
        enterTime:    action.enterTime,
      };
    }
    return state;

  case 'LEAVE_DEMO_MODAL':
    if (state.currentModal === action.currentModal) {
      return {
        ...state,
        currentModal:  action.currentModal,
        enterTime:    action.enterTime
      };
    }
    return state;

  default:
    return state;
  }
}


///////////////////////
// actions creators
///////////////////////
export function enterDemoModal(time = moment().format()) {
  return {
    type:         ENTER_DEMO_MODAL,
    currentView:  'demoModal',
    enterTime:    time
  };
}

export function leaveDemoModal(time = moment().format()) {
  return {
    type:         LEAVE_DEMO_MODAL,
    currentView:  'demoModal',
    enterTime:    null
  };
}

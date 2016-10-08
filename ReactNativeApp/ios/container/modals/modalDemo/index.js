'use strict';

import { AppState }           from '../../../scenes';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as modalsActions      from '../../../../common/redux/modules/modals';

const mapStateToProps = (state) => {
  return {
    currentModal:   state.modals.currentModal,
    enterTime:      state.modals.enterTime
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
      {
        enterModalDemo: modalsActions.enterModalDemo,
        leaveModalDemo: modalsActions.leaveModalDemo
      },
      dispatch
    );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppState);

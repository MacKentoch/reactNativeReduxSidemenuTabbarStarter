'use strict';

import { ModalDemo }          from '../../../modals';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as modalsActions     from '../../../../common/redux/modules/modals';

const mapStateToProps = (state) => {
  return {
    currentModal:   state.modals.currentModal,
    enterTime:      state.modals.enterTime
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
      {
        enterDemoModal: modalsActions.enterDemoModal,
        leaveDemoModal: modalsActions.leaveDemoModal
      },
      dispatch
    );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDemo);

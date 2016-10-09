'use strict';

import React, {
  Component,
  PropTypes
}                           from 'react';
import {
  StyleSheet,
  View,
  Text
}                           from 'react-native';
import {
  Button
}                           from '../../components';
import Icon                 from 'react-native-vector-icons/Ionicons';


class ModalDemo extends Component {
  render() {
    const { closeModal } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.modalHeader}>
          <Button
            style={styles.backButton}
            onPress={closeModal}>
            <Icon
              name={'ios-arrow-back'}
              size={32}
              color={'#F1F2F3'}
            />
          </Button>
        </View>
        <View style={styles.modalContent}>
          <Text style={styles.title}>
            Modal Demo
          </Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498DB',
  },
  modalHeader: {
    height: 60,
    marginTop: 20
  },
  modalContent: {
    flex: 1,
  },
  backButton: {
    marginTop       : 4,
    paddingTop      : 0,
    paddingBottom   : 10,
    paddingLeft     : 20,
    paddingRight    : 10
  },
  title: {
    textAlign: 'center',
    color: '#F1F2F3'
  }
});

ModalDemo.propTypes = {
  currentModal: PropTypes.string.isRequired,
  enterTime: PropTypes.string,

  // from App:
  closeModal: PropTypes.func.isRequired,

  actions: PropTypes.shape({
    enterDemoModal: PropTypes.func.isRequired,
    leaveDemoModal: PropTypes.func.isRequired
  })
};

export default ModalDemo;

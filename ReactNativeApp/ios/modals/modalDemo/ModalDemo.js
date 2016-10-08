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

class ModalDemo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>
          Modal Demo
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabText: {
    color: '#4A4A4A'
  }
});

ModalDemo.propTypes = {
  currentModal: PropTypes.string.isRequired,
  enterTime: PropTypes.string,

  actions: PropTypes.shape({
    enterDemoModal: PropTypes.func.isRequired,
    leaveDemoModal: PropTypes.func.isRequired
  })
};

export default ModalDemo;

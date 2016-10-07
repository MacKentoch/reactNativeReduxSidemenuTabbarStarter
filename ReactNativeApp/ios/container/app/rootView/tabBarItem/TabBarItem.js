'use strict';

import React, {
  PropTypes,
  Component
}                           from 'react';
import {
  StyleSheet,
  View
}                           from 'react-native';
import shallowCompare       from 'react-addons-shallow-compare';
import Icon                 from 'react-native-vector-icons/Ionicons';

class TabBarItem extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const {
      iconName,
      selectedIconName,
      title,
      selected,
      allowFontScaling,
      children
    } = this.props;

    return (
      <Icon.TabBarItemIOS
        iconName={iconName}
        selectedIconName={selectedIconName}
        title={title}
        selected={selected}
        allowFontScaling={allowFontScaling}
        onPress={this.handlesOnPress}>
        <View style={styles.tabContent}>
          { children }
        </View>
      </Icon.TabBarItemIOS>
    );
  }

  handlesOnPress = () => {
    const { tabId, onPress } = this.props;
    onPress(tabId);
  }
}

const styles = StyleSheet.create({
  tabContent: {
    backgroundColor: '#fff',
    flex: 1
  },
  tabText: {
    color: '#4A4A4A'
  }
});

TabBarItem.propTypes = {
  tabId: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  selectedIconName: PropTypes.string.isRequired,
  title: PropTypes.string,
  selected: PropTypes.bool.isRequired,
  allowFontScaling: PropTypes.bool,

  onPress: PropTypes.func.isRequired,

  children: PropTypes.node
};

TabBarItem.defaultProps = {
  title: '',
  allowFontScaling: false
};

export default TabBarItem;

'use strict';

import React, {
  Component
}                             from 'react';
import {
  StyleSheet,
  View,
  TabBarIOS
}                             from 'react-native';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import Icon                   from 'react-native-vector-icons/Ionicons';
import { tabBarContent }      from '../../../../common/config';
import TabBarItem             from './tabBarItem/TabBarItem';
import Home                   from '../../home';
import AppState               from '../../appState';


class RootView extends Component {

  state = {
    tabBarItems: [...tabBarContent],
    selectedTabbar: 'Home'
  };

  componentDidMount() {
    this.addComponents();
  }

  render() {
    const { selectedTabbar, tabBarItems } = this.state;

    return (
      <TabBarIOS
        tintColor={'#333333'}
        barTintColor={'#fff'}>
        {
          tabBarItems.map(
            (tabBarItem, tabBarItemIdx) => {
              const { id, componentName, iconName, selectedIconName, title, component } = tabBarItem;
              return (
                <TabBarItem
                  key={tabBarItemIdx}
                  tabId={id}
                  iconName={iconName}
                  selectedIconName={selectedIconName}
                  title={title}
                  selected={componentName === selectedTabbar}
                  onPress={this.onTabBarItemPress}>
                  {component}
                </TabBarItem>
              );
            }
          )
        }
      </TabBarIOS>
    );
  }

  addComponents() {
    const { tabBarItems } = this.state;
    const tabBarItemWithComponents = tabBarItems.map(
      item => {
        return {
          ...item,
          component: <item.componentName />
        };
      }
    );
    this.setState({tabBarItems: [...tabBarItemWithComponents]});
  }

  onTabBarItemPress = (tabBarSelected) => {
    this.setState({ selectedTabbar: tabBarSelected });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContent: {
    backgroundColor: '#fff',
    flex: 1
  },
  tabText: {
    color: '#4A4A4A'
  }
});


const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootView);

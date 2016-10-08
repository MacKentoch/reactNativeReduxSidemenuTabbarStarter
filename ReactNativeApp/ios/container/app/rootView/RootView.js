'use strict';

import React, {
  Component
}                             from 'react';
import {
  TabBarIOS
}                             from 'react-native';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
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
        switch (item.componentName) {
        case 'Home':
          return {
            ...item,
            component: <Home />
          };
        case 'AppState':
        return {
          ...item,
          component: <AppState />
        };
        default:
        return {
          ...item,
          component: <Home />
        };
        }
      }
    );
    this.setState({tabBarItems: [...tabBarItemWithComponents]});
  }

  onTabBarItemPress = (tabBarSelected) => {
    this.setState({ selectedTabbar: tabBarSelected });
  }
}


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

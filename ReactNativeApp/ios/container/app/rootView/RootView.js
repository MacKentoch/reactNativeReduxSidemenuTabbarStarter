'use strict';

import React, {
  Component
}                             from 'react';
import {
  TabBarIOS
}                             from 'react-native';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sidemenuActions   from '../../../../common/redux/modules/sidemenu';
import { tabBarContent }      from '../../../../common/config';
import TabBarItem             from './tabBarItem/TabBarItem';
import Home                   from '../../scenes/home';
import AppState               from '../../scenes/appState';


class RootView extends Component {

  state = {
    tabBarItems: [...tabBarContent],
    selectedTabbar: 'Home' // default tab
  };

  componentDidMount() {
    this.addComponents(); // add matching tab child components into tabBarItems
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

  /*
    tabbar methods:
  */
  onTabBarItemPress = (tabBarSelected) => {
    this.setState({ selectedTabbar: tabBarSelected });
  }

  /*
    sidemenu methods:
  */
 updateSideMenuState = (isOpened) => {
   const { actions: { setSideMenuState } } = this.props;
   setSideMenuState(isOpened);
 }

 toggleSideMenu = () => {
   const { actions: {toggleSideMenu } } = this.props;
   toggleSideMenu();
 }

 openSideMenu = () => {
   const { actions: { openSideMenu } } = this.props;
   openSideMenu();
 }

 closeSideMenu = () => {
   const { sideMenuOpened, actions: { closeSideMenu } } = this.props;
   if (sideMenuOpened) {
     closeSideMenu();
   }
 }
}


const mapStateToProps = (state) => {
  return {
    // sidemenu props:
    sideMenuOpened: state.sidemenu.isOpened
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        // sidemenu actions:
        openSideMenu: sidemenuActions.openSideMenu,
        closeSideMenu: sidemenuActions.closeSideMenu,
        toggleSideMenu: sidemenuActions.toggleSideMenu,
        setSideMenuState: sidemenuActions.setSideMenuState
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootView);

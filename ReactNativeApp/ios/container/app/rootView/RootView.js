'use strict';

import React, {
  Component,
  PropTypes
}                             from 'react';
import {
  StyleSheet,
  View,
  Text,
  TabBarIOS,
  Dimensions,
  Navigator,
}                             from 'react-native';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sidemenuActions   from '../../../../common/redux/modules/sidemenu';
import { tabBarContent }      from '../../../../common/config';
import TabBarItem             from './tabBarItem/TabBarItem';
import Home                   from '../../scenes/home';
import AppState               from '../../scenes/appState';
import {
  Button,
  SideMenuContent
}                             from '../../../components';
import SideMenu               from 'react-native-side-menu';
import Icon                   from 'react-native-vector-icons/Ionicons';

const DEFAULT_ROUTE = { id: 'ROOTVIEW' };
const SCREEN_WIDTH = Dimensions.get('window').width;
const OPEN_SIDE_MENU_OFFSET = SCREEN_WIDTH * 0.8;

class RootView extends Component {

  state = {
    tabBarItems: [...tabBarContent],
    selectedTabbar: 'Home' // default tab
  };

  componentDidMount() {
    this.addComponents(); // add matching tab child components into tabBarItems
  }

  render() {
    const { sidemenuRoutes, onSideNavButtonPress, sideMenuOpened } = this.props;

    return (
      <SideMenu
        menu={<SideMenuContent
                backGndColor="#ECECEC"
                routes={sidemenuRoutes}
                navButtonPress={onSideNavButtonPress}
              />}
        isOpen={sideMenuOpened}
        onChange={this.updateSideMenuState}
        bounceBackOnOverdraw={false}
        openMenuOffset={OPEN_SIDE_MENU_OFFSET}
        >
        <Navigator
          ref="rootNavigator"
          initialRoute={ DEFAULT_ROUTE }
          sceneStyle={ styles.navigator }
          renderScene={this.renderScene}
          configureScene={this.configureScene}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={this.renderRouteMapper()}
              style={styles.navBar}
            />
          }
        />
      </SideMenu>
    );
  }

  renderScene = (route, navigator) => {
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

  renderRouteMapper() {
    return  {
      Title : (route, navigator, index, navState) => {
        return (
          <Text style={styles.titleNavText}>
            {''}
          </Text>
        );
      },
      LeftButton : (route, navigator, index, navState) => {
        return (
          <Button
            style={styles.leftNavButton}
            onPress={this.toggleSideMenu}>
            <Icon
              name={'ios-menu'}
              size={32}
              color={'#333333'}
            />
          </Button>
        );
      },
      RightButton : (route, navigator, index, navState) => {
        return null;
      }
    };
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

const styles = StyleSheet.create({
  navigator: {
    backgroundColor: '#fff'
  },
  navBar: {
    backgroundColor: '#fff',
    borderBottomWidth:      StyleSheet.hairlineWidth,
    borderBottomColor:    '#F1F1F1'
  },
  leftNavButton : {
    flex            : 1,
    flexDirection   : 'column',
    alignItems      : 'center',
    marginTop       : 4,
    paddingTop      : 0,
    paddingBottom   : 10,
    paddingLeft     : 20,
    paddingRight    : 10
  },
  rightNavButton : {
    flex            : 1,
    flexDirection   : 'column',
    alignItems      : 'center',
    marginTop       : 4,
    paddingTop      : 6,
    paddingBottom   : 10,
    paddingLeft     : 10,
    paddingRight    : 10
  },
  titleNavText : {
    marginTop   : 14,
    color       : '#333333'
  }
});


RootView.propTypes = {
  allRoutes: PropTypes.array,

  // sidemenu:
  sidemenuRoutes: PropTypes.array,
  onSideNavButtonPress: PropTypes.func.isRequired,

};


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

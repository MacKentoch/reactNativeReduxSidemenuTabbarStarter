'use strict';

import React, {
  Component
}                             from 'react';
import {
  StyleSheet,
  Text,
  Navigator,
  StatusBar
}                             from 'react-native';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sidemenuActions   from '../../../common/redux/modules/sidemenu';
import Icon                   from 'react-native-vector-icons/Ionicons';
import { AppRoutes }          from '../../../common/config';
import {
  Button
}                             from '../../components';
import RootView               from './rootView/RootView';
import ModalDemo              from '../modals/modalDemo';

const DEFAULT_ROUTE = { id: 'ROOTVIEW' };
// all routes:
const ROUTES = AppRoutes.getAllRoutes();
// routes to display within sidemenu:
const SIDEMENU_ROUTES = ROUTES.filter(
  route => route.sidemenu && route.sidemenu.showInSideMenu
);

/*
  set iOS StatusBar style:
 */
StatusBar.setBarStyle('default', true);
// StatusBar.setBarStyle('light-content', true);

class App extends Component {
  render() {
    return (
      // this navigator to present modals over rootView
      <Navigator
        ref="navigator"
        initialRoute={ DEFAULT_ROUTE }
        sceneStyle={ styles.navigator }
        renderScene={this.renderScene}
        configureScene={this.configureScene}
      />
    );
  }

  handlesSideNavButtonPress = (toRoute) => {
    this.refs.navigator.push({id: toRoute.id});
  }

  configureScene = (route) => {
    switch (route.id) {
    case 'ROOTVIEW':
      return Navigator.SceneConfigs.FadeAndroid;
    case 'MODAL_DEMO':
      return Navigator.SceneConfigs.FloatFromRight; // Navigator.SceneConfigs.PushFromRight;// Navigator.SceneConfigs.FloatFromRight;
    default:
      return Navigator.SceneConfigs.FadeAndroid;
    }
  }

  renderScene = (route, navigator) => {
    switch (route.id) {
    case 'ROOTVIEW':
      return (
        <RootView
          ref={'ROOTVIEW'}
          navigator={navigator}
          navigate={this.navigate}
          sidemenuRoutes={SIDEMENU_ROUTES}
          onSideNavButtonPress={this.handlesSideNavButtonPress}
          allRoutes={ROUTES}
        />
      );
    case 'MODAL_DEMO':
      return (
        <ModalDemo
          ref={'MODALDEMO'}
          navigator={navigator}
          navigate={this.navigate}
        />
      );
    default:
      return (
        <RootView
          ref={'ROOTVIEW'}
          navigator={navigator}
          navigate={this.navigate}
        />
      );
    }
  }

  renderRouteMapper() {
    const routes = AppRoutes.getAllRoutes();
    return  {
      Title : (route, navigator, index, navState) => {
        return (
          <Text style={styles.titleNavText}>
            {routes.id}
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
)(App);

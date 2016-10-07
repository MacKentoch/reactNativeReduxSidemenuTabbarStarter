'use strict';

import React, {
  Component
}                           from 'react';
import {
  StyleSheet,
  Text,
  Navigator,
  StatusBar
}                           from 'react-native';
import Icon                 from 'react-native-vector-icons/Ionicons';
import { AppRoutes }        from '../../../common/config';
import {
  Button
}                           from '../../components';
import RootView             from './rootView/RootView';
import ModalDemo            from '../../modals';

const DEFAULT_ROUTE = { id: 'ROOTVIEW' };

/*
  set iOS StatusBar style:
 */
StatusBar.setBarStyle('default', true);
// StatusBar.setBarStyle('light-content', true);

class App extends Component {

  state = {
    sideMenuOpened: false
  };

  render() {
    return (
      <Navigator
        ref="navigator"
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
    );
  }

  configureScene = (route) => {
    switch (route.id) {
    case 'ROOTVIEW':
      return Navigator.SceneConfigs.FadeAndroid;
    case 'MODAL_DEMO':
      return Navigator.SceneConfigs.FloatFromRight;
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

  navigate = (route) => {
    const routeStack = [...this.refs.navigator.getCurrentRoutes()];
    const previousRouteId = routeStack[routeStack.length - 1].id;
    if (route.id !== previousRouteId) {
      this.refs.navigator.replace(route);
    }

    if (this.state.sideMenuOpened) {
      this.closeSideMenu();
    }
  }

  updateSideMenuState = (isOpened) => {
    this.setState({
      sideMenuOpened: isOpened
    });
  }

  toggleSideMenu = () => {
    this.setState({
      sideMenuOpened: !this.state.sideMenuOpened
    });
  }

  openSideMenu = () => {
    this.setState({
      sideMenuOpened : false
    });
  }

  closeSideMenu = () => {
    if (this.state.sideMenuOpened) {
      this.setState({
        sideMenuOpened : false
      });
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

export default App;

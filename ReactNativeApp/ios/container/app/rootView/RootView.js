'use strict';

import React, {
  Component
}                           from 'react';
import {
  StyleSheet,
  View,
  TabBarIOS,
  Dimensions,

}                           from 'react-native';
import SideMenu             from 'react-native-side-menu';
import Icon                 from 'react-native-vector-icons/Ionicons';
import { tabBarContent }    from '../../../common/config';
import {
  SideMenuContent
}                           from '../../components';
import TabBarItem           from './tabBarItem/TabBarItem';
import Home                 from '../home';
import AppState             from '../appState';


const SCREEN_WIDTH = Dimensions.get('window').width;
const OPEN_SIDE_MENU_OFFSET = SCREEN_WIDTH * 0.8;


class RootView extends Component {

  state = {
    sideMenuOpened: false,
    tabBarItems: [...tabBarContent],
    selectedTabbar: 'home'
  };

  componentDidMount() {
    this.addComponents();
  }

  render() {
    const { sideMenuOpened, selectedTabbar } = this.state;

    return (
      <SideMenu
        menu={<SideMenuContent
                backGndColor="#ECECEC"
                navigate={this.navigate}
              />}
        isOpen={sideMenuOpened}
        onChange={this.updateSideMenuState}
        bounceBackOnOverdraw={false}
        openMenuOffset={OPEN_SIDE_MENU_OFFSET}
        >

        <TabBarIOS
          tintColor={'#333333'}
          barTintColor={'#fff'}>

          <Icon.TabBarItemIOS
            iconName={'ios-home-outline'}
            selectedIconName={'ios-home'}
            title={'Accueil'}
            selected={selectedTabbar === 'home'}
            allowFontScaling={false}
            onPress={this.onTabBarItemPress}>
            <View style={styles.tabContent}>
              <Home />
            </View>
          </Icon.TabBarItemIOS>

          <Icon.TabBarItemIOS
            iconName={'ios-albums-outline'}
            selectedIconName={'ios-albums'}
            title={'appState'}
            selected={selectedTabbar === 'appState'}
            allowFontScaling={false}
            onPress={this.onTabBarItemPress}>
            <View style={styles.tabContent}>
              <AppState />
            </View>
          </Icon.TabBarItemIOS>

        </TabBarIOS>

      </SideMenu>
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

export default RootView;

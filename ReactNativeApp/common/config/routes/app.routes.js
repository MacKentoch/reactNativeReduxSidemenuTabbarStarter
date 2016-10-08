'use strict';

const routes = [
  // rootview with tabbar:
  {
    id: 'ROOTVIEW',
    refView: 'ROOTVIEW',
    sidemenu: {
      // should be added in sidemenu:
      showInSideMenu: false,
      sideMenuButtonText: 'root',
      iconType: 'Ionicons',
      iconName: 'ios-home-outline',
      iconSize: 22,
    },
    navbar: {
      navBarTitle: 'root',
      navBarLeftIconName: 'ios-menu',
      navBarLeftIconSize: 32
    }
  },
  // demoModal:
  {
    id: 'MODAL_DEMO',
    refView: 'MODAL_DEMO',
    sidemenu: {
      // should be added in sidemenu:
      showInSideMenu: true,
      sideMenuButtonText: 'demo modal',
      iconType: 'ionicons',
      iconName: 'ios-glasses-outline',
      iconSize: 22,
    },
    navbar: {
      navBarTitle: 'demo modal',
      navBarLeftIconName: 'ios-menu',
      navBarLeftIconSize: 32
    }
  }
];


class AppRoutesClass {
  getRouteFromRouteId(routeId) {
    return routes.find(route => route.id === routeId);
  }

  getAllRoutes() {
    return [...routes];
  }
}


const AppRoutes = new AppRoutesClass();

export default AppRoutes;

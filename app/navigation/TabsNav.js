import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import WebsiteListScreen from '../screens/WebsiteListScreen';
import ExploreScreen from '../screens/ExploreScreen';
import AdminScreen from '../screens/AdminScreen';

const TabBarIcon = ({ name, focused }) => (
  <Ionicons
    name={`${name}${focused ? '' : '-outline'}`}
    size={28}
    style={{ marginBottom: -3, marginLeft: 3, width: 24 }}
    color={focused ? '#2f95dc' : '#ccc'}
  />
);

const defaultConfig = {
  WebsiteList: {
    screen: WebsiteListScreen,
    navigationOptions: {
      tabBarIcon: ({ focused }) => <TabBarIcon name='ios-apps' focused={focused} />,
    },
  },
  Explore: {
    screen: ExploreScreen,
    navigationOptions: {
      tabBarIcon: ({ focused }) => <TabBarIcon name='ios-compass' focused={focused} />,
    },
  },
};

const adminTab = {
  screen: AdminScreen,
  navigationOptions: {
    tabBarIcon: ({ focused }) => <TabBarIcon name='ios-clipboard' focused={focused} />,
  },
};

const options = {
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  swipeEnabled: false,
  headerMode: 'screen',
};

export const AdminTabs = TabNavigator(
  {
    ...defaultConfig,
    Admin: adminTab,
  },
  options,
);

export const NormalTabs = TabNavigator(
  defaultConfig,
  options,
);

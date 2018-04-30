import React, { Component } from 'react';
import {
  StackNavigator,
  SwitchNavigator,
  TabBarBottom,
  TabNavigator,
} from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import { firebase } from '../api';
import { ADMIN_USER_ID } from '../constants';

import CreateWebsiteScreen from '../screens/CreateWebsiteScreen';
import EditLayoutScreen from '../screens/EditLayoutScreen';
import WebsiteSettingsScreen from '../screens/WebsiteSettingsScreen';
import SavingWebsiteScreen from '../screens/SavingWebsiteScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
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

class RootNavigation extends Component {
  render() {
    const user = firebase.auth().currentUser;
    const isAdmin = user && user.uid === ADMIN_USER_ID;

    const defaultConfig = {
      Home: {
        screen: user ? HomeScreen : WelcomeScreen,
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

    const adminConfig = {
      ...defaultConfig,
      Admin: {
        screen: AdminScreen,
        navigationOptions: {
          tabBarIcon: ({ focused }) => <TabBarIcon name='ios-clipboard' focused={focused} />,
        },
      },
    };

    const RootStackNavigator = StackNavigator(
      {
        MainStack: StackNavigator(
          {
            Tabs: {
              screen: TabNavigator(
                isAdmin ? adminConfig : defaultConfig,
                {
                  tabBarComponent: TabBarBottom,
                  tabBarPosition: 'bottom',
                  animationEnabled: false,
                  swipeEnabled: false,
                  headerMode: 'screen',
                },
              ),
            },
            WebsiteStack: {
              screen: StackNavigator(
                {
                  EditLayout: { screen: EditLayoutScreen },
                  SavingWebsite: { screen: SavingWebsiteScreen },
                  WebsiteSettings: { screen: WebsiteSettingsScreen },
                  CreateWebsite: { screen: CreateWebsiteScreen },
                },
                {
                  headerMode: 'none',
                },
              ),
            },
          },
          {
            headerMode: 'screen',
          },
        ),
        AuthStack: {
          screen: SwitchNavigator({
            Signup: { screen: SignupScreen },
            Login: { screen: LoginScreen },
          }),
        },
      },
      {
        mode: 'modal',
        headerMode: 'none',
      },
    );

    return <RootStackNavigator />;
  }
}

export default RootNavigation;

import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Root } from 'native-base';
import RootNavigation from './navigation/RootNavigation';
import UserContext from './components/UserContext';
import { firebase } from './api';

export default class App extends React.Component {
  state = {
    isLoading: true,
    authLoading: true,
    user: null,
  };

  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user, authLoading: false });
    });
  }

  componentWillUnmount() {
    // Cancel Subscription
    this.authSubscription();
  }

  loadResourcesAsync = async () => Promise.all([
    Font.loadAsync({
      ...Ionicons.font,
    }),
  ]);

  handleLoadingError = (error) => {
    console.error(error);
  };

  handleFinishLoading = () => {
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading, authLoading, user } = this.state;

    if (isLoading || authLoading) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }

    return (
      <Root>
        <UserContext.Provider value={user}>
          <View style={styles.container}>
            <StatusBar barStyle="default" />
            <RootNavigation />
          </View>
        </UserContext.Provider>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

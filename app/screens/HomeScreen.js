import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Button, Icon, Text } from 'native-base';
import { firebase } from '../api';

import WebsitesList from '../components/WebsitesList';

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    key: 'home',
    headerLeft: (
      <Button iconLeft transparent primary onPress={() => firebase.auth().signOut()}>
        <Icon name='ios-contact' style={{ fontSize: 30, marginTop: -6 }} />
      </Button>
    ),
    headerRight: (
      <Button iconLeft transparent primary onPress={() => navigation.navigate('CreateWebsite')}>
        <Icon name='ios-add' style={{ fontSize: 40, marginTop: -6, marginRight: 16 }} />
      </Button>
    ),
  });

  render() {
    const { navigate } = this.props.navigation;

    return (
      <Container>
        <WebsitesList navigate={navigate} />
      </Container>
    );
  }
}

export default HomeScreen;

import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Container,
  Body,
  Text,
  H1,
  Button,
} from 'native-base';

class WelcomeMessage extends Component {
  goToSignup = () => this.props.navigate('Signup')
  goToLogin = () => this.props.navigate('Login')

  render() {
    return (
      <Container>
        <Body style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
          <View />
          <View>
            <H1 style={{ textAlign: 'center', marginBottom: 10 }}>Get Started</H1>
            <Text style={{ textAlign: 'center', marginHorizontal: 40, marginBottom: 10 }}>
              Sign up now to create your own website.
              If you already have an account you can
              login to access your websites.
            </Text>
            <Button primary style={{ alignSelf: 'center' }} onPress={this.goToSignup}>
              <Text>Sign Up</Text>
            </Button>
          </View>
          <Button full primary transparent onPress={this.goToLogin}>
            <Text>Log in</Text>
          </Button>
        </Body>
      </Container>
    );
  }
}

export default WelcomeMessage;

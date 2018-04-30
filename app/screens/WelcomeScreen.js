import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Button, Text } from 'native-base';

class WelcomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
  };

  goToSignup = () => this.props.navigation.navigate('Signup')
  goToLogin = () => this.props.navigation.navigate('Login')

  render() {
    return (
      <Container>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
          <View />
          <View>
            <Text style={{ textAlign: 'center', marginBottom: 10, fontSize: 32, fontWeight: '700' }}>Get Started</Text>
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
        </View>
      </Container>
    );
  }
}

export default WelcomeScreen;

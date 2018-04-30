import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Text,
  Container,
  Button,
  Icon,
} from 'native-base';
import t from 'tcomb-form-native';

import { firebase } from '../api';
import tEmail from '../utils/tEmail';
import styles from '../utils/fullFormStyles';

const { Form } = t.form;

const Login = t.struct({
  email: tEmail,
  password: t.String,
});

const options = {
  fields: {
    email: {
      autoCapitalize: 'none',
    },
    password: {
      password: true,
      secureTextEntry: true,
    },
  },
};

class LoginScreen extends Component {
  goToSignup = () => this.props.navigation.navigate('Signup');
  goHome = () => this.props.navigation.popToTop();

  handleSubmit = async () => {
    const value = this.form.getValue();
    if (!value) return;

    const { email, password } = value;

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      this.goHome();
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <Container>
        <View style={{ flex: 1, justifyContent: 'space-between', marginTop: 20 }}>
          <View>
            <Button iconLeft transparent primary style={styles.closeButton} onPress={this.goHome}>
              <Icon name='close' style={styles.closeIcon} />
            </Button>
            <Text style={styles.title}>Log in</Text>
            <View style={styles.form}>
              <Form ref={el => (this.form = el)} type={Login} options={options} />
              <Button block style={{ marginVertical: 10 }} onPress={this.handleSubmit}>
                <Text>Log in</Text>
              </Button>
            </View>
          </View>
          <Button transparent full style={{ marginBottom: 20 }} onPress={this.goToSignup}>
            <Text>Don’t have an account? Sign up.</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

export default LoginScreen;

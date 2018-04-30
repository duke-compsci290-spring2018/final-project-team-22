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

const Signup = t.struct({
  name: t.String,
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

class SignupScreen extends Component {
  goToLogin = () => this.props.navigation.navigate('Login');
  goHome = () => this.props.navigation.popToTop();

  handleSubmit = async () => {
    const value = this.form.getValue();
    if (!value) return;

    const { name, email, password } = value;

    try {
      const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
      await user.updateProfile({ displayName: name });
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
            <Text style={styles.title}>Sign up</Text>
            <View style={styles.form}>
              <Form ref={el => (this.form = el)} type={Signup} options={options} />
              <Button block style={{ marginVertical: 10 }} onPress={this.handleSubmit}>
                <Text>Sign up</Text>
              </Button>
            </View>
          </View>
          <Button transparent full style={{ marginBottom: 20 }} onPress={this.goToLogin}>
            <Text>Already have an account? Log in.</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

export default SignupScreen;

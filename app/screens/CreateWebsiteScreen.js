import React, { Component } from 'react';
import t from 'tcomb-form-native';
import {
  Container,
  View,
  Button,
  Text,
  Icon,
} from 'native-base';
import styles from '../utils/fullFormStyles';

import { base, firebase } from '../api';

const { Form } = t.form;

const Website = t.struct({
  name: t.String,
  slug: t.String,
  showInExplore: t.Boolean,
});

const options = {
  fields: {
    slug: {
      autoCapitalize: 'none',
    },
  },
};

class CreateWebsiteScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  handleSubmit = async () => {
    const value = this.form.getValue();
    if (!value) return;

    const user = firebase.auth().currentUser;
    const { name, slug, showInExplore } = value;

    try {
      await base.addToCollection('Websites', {
        name,
        slug,
        showInExplore,
        owner: user.uid,
        layout: [],
      });

      this.props.navigation.navigate('Home');
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <View style={{ flex: 1, marginTop: 20 }}>
          <Button iconLeft transparent primary style={styles.closeButton} onPress={() => navigate('Home')}>
            <Icon name='close' style={styles.closeIcon} />
          </Button>
          <Text style={styles.title}>Create Website</Text>
          <View style={styles.form}>
            <Form
              ref={el => (this.form = el)}
              type={Website}
              options={options}
              value={{ showInExplore: false }}
            />
            <Button block style={{ marginVertical: 10 }} onPress={this.handleSubmit}>
              <Text>Create Website</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}

export default CreateWebsiteScreen;

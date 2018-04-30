import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import {
  Container,
  View,
  Button,
  Text,
} from 'native-base';
import t from 'tcomb-form-native';
import { base } from '../api';

const { Form } = t.form;

const Settings = t.struct({
  name: t.String,
  slug: t.String,
  showInExplore: t.Boolean,
});

const options = {
  fields: {
    subdomain: {
      autoCapitalize: 'none',
    },
  },
};

class WebsiteSettingsScreen extends Component {
  static navigationOptions = {
    title: 'Website Settings',
  };

  handleSave = async () => {
    const values = this.form.getValue();
    if (!values) return;

    const { website } = this.props.navigation.state.params;

    try {
      const { name, slug, showInExplore } = values;
      await base.updateDoc(`Websites/${website.id}`, {
        ...website,
        name,
        slug,
        showInExplore,
      });
      this.props.navigation.navigate('Home');
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { website } = this.props.navigation.state.params;
    return (
      <Container>
        <View style={{ flex: 1, margin: 20 }}>
          <View style={{ backgroundColor: '#fff', padding: 16, borderRadius: 4 }}>
            <Form
              ref={el => (this.form = el)}
              type={Settings}
              options={options}
              value={{
                name: website.name,
                slug: website.slug,
                showInExplore: website.showInExplore,
              }}
            />
          </View>
          <Button block style={{ marginVertical: 16 }} onPress={this.handleSave}>
            <Text>Save</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

export default WebsiteSettingsScreen;

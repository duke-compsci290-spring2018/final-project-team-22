import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { Container, Spinner } from 'native-base';
import LayoutEditor from '../components/LayoutEditor';
import { base } from '../api';

class EditLayoutScreen extends Component {
  static navigationOptions = {
    header: 'none',
  };

  state = {
    website: null,
    loading: true,
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    if (params) this.loadWebsite(params.websiteId);
  }

  loadWebsite = async (websiteId) => {
    try {
      const website = await base.get(`Websites/${websiteId}`, {
        context: this,
        withIds: true,
      });
      console.info(website);
      this.setState({ loading: false, website });
    } catch (err) {
      console.error(err);
    }
  }

  handleCancel = () => this.props.navigation.navigate('WebsiteList');

  handleSave = async ({ layout }) => {
    const website = {
      ...this.state.website,
      layout,
    };

    try {
      await base.updateDoc(`Websites/${website.id}`, website);
      this.props.navigation.navigate('SavingWebsite', { website });
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { website, loading } = this.state;

    return (
      <Container>
        <StatusBar hidden />
        {
          loading ? (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Spinner color='blue' />
            </View>
          ) : (
            <LayoutEditor
              layout={website.layout}
              onSave={this.handleSave}
              onCancel={this.handleCancel}
            />
          )
        }
      </Container>
    );
  }
}

export default EditLayoutScreen;

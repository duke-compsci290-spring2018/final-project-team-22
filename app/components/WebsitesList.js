import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Pages } from 'react-native-pages';
import { WebBrowser } from 'expo';
import {
  Container,
  Spinner,
  H1,
  Text,
  Icon,
  Button,
} from 'native-base';
import { base, firebase } from '../api';
import WebsiteCard from './WebsiteCard';

class WebsitesList extends Component {
  state = {
    loading: true,
    websites: null,
  };

  componentDidMount() {
    this.loadWebsites();
  }

  goToCreateWebsite = () => this.props.navigate('CreateWebsite')

  loadWebsites = async () => {
    const user = firebase.auth().currentUser;
    base.bindCollection('Websites', {
      context: this,
      state: 'websites',
      withRefs: true,
      withIds: true,
      query: ref => ref.where('owner', '==', user.uid),
      then: () => this.setState({ loading: false }),
      onFailure: err => console.error(err),
    });
  }

  viewWebsite = website => WebBrowser.openBrowserAsync(`http://oncosmos.herokuapp.com/${website.slug}`);
  editWebsite = website => this.props.navigate('EditLayout', { websiteId: website.id });
  websiteSettings = website => this.props.navigate('WebsiteSettings', { website });

  render() {
    const { loading, websites } = this.state;

    if (loading) {
      return (
        <Container>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Spinner color='blue' />
          </View>
        </Container>
      );
    }

    if (websites.length === 0) {
      return (
        <Container>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <H1 style={{ textAlign: 'center', marginBottom: 10 }}>No Websites</H1>
            <Text style={{ textAlign: 'center', marginHorizontal: 40, marginBottom: 10 }}>
              Looks like you don’t have any websites yet.
              Create your first one now.
            </Text>
            <Button style={{ alignSelf: 'center' }} onPress={this.goToCreateWebsite}>
              <Text>Create Website</Text>
            </Button>
          </View>
        </Container>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <Pages>
          {
            websites.map(website => (
              <View
                key={website.id}
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 24,
                }}
              >
                <View style={{ alignItems: 'center' }}>
                  <Text style={{ fontSize: 32, fontWeight: '700', marginBottom: 8 }}>{ website.name }</Text>
                  <Text style={{ fontSize: 20, fontWeight: '600' }}>oncomos.herokuapp.com/{website.slug}</Text>
                </View>
                <TouchableOpacity onPress={() => this.editWebsite(website)}>
                  <WebsiteCard website={website} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                  <TouchableOpacity onPress={() => this.viewWebsite(website)}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', width: 80, height: 80 }}>
                      <Icon name='ios-eye' />
                      <Text>View</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.websiteSettings(website)}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', width: 80, height: 80 }}>
                      <Icon name='ios-settings' />
                      <Text>Settings</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.editWebsite(website)}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', width: 80, height: 80 }}>
                      <Icon name='ios-create-outline' />
                      <Text>Edit</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          }
        </Pages>
      </View>
    );
  }
}

export default WebsitesList;

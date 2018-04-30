import React, { Component } from 'react';
import { View } from 'react-native';
import { WebBrowser } from 'expo';
import {
  Container,
  Content,
  Text,
} from 'native-base';
import Masonry from 'react-native-masonry';
import { base } from '../api';
import { PREVIEW_DOMAIN } from '../constants';

class ExploreScreen extends Component {
  static navigationOptions = {
    title: 'Explore',
    headerLeft: null,
  };

  state = {
    websites: [],
  }

  componentDidMount() {
    this.loadWebsites();
  }

  loadWebsites = async () => {
    try {
      const websites = await base.get('Websites', {
        context: this,
        withIds: true,
        query: ref => ref.where('showInExplore', '==', true),
      });
      this.setState({ websites });
    } catch (err) {
      console.error(err);
    }
  }

  viewWebsite = website => WebBrowser.openBrowserAsync(`${PREVIEW_DOMAIN}${website.slug}`);

  render() {
    const { websites } = this.state;
    return (
      <Container>
        <Content style={{ padding: 16 }}>
          <Masonry
            bricks={
              websites.map(website => ({
                uri: website.previewImage || 'http://via.placeholder.com/300x400/2f95dc/ffffff?text=New+Website',
                data: { website },
                onPress: data => this.viewWebsite(data.website),
                renderFooter: data => (
                  <View
                    key={data.website.id}
                    style={{
                      backgroundColor: 'white',
                      padding: 8,
                      borderTopColor: '#ccc',
                      borderTopWidth: 1,
                    }}
                  >
                    <Text
                      style={{ fontWeight: '600', fontSize: 14, textAlign: 'center' }}
                    >
                      {data.website.name}
                    </Text>
                  </View>
                ),
              }))
            }
          />
        </Content>
      </Container>
    );
  }
}

export default ExploreScreen;

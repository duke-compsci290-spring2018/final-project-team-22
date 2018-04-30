import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { WebBrowser } from 'expo';
import {
  Container,
  Content,
  List,
  ListItem,
} from 'native-base';
import { base } from '../api';
import WebsiteCard from '../components/WebsiteCard';
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
        <Content>
          <List
            dataArray={websites}
            renderRow={website => (
              <ListItem style={{ height: 500 }}>
                <TouchableOpacity
                  onPress={() => this.viewWebsite(website)}
                  style={{ flex: 1, marginVertical: 50, alignItems: 'center' }}
                >
                  <WebsiteCard website={website} />
                </TouchableOpacity>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}

export default ExploreScreen;

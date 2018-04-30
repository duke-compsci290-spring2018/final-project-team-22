import React, { Component } from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Text,
  Icon,
  Body,
  Thumbnail,
  Right,
} from 'native-base';
import { base } from '../api';
import { PREVIEW_DOMAIN } from '../constants';

class AdminScreen extends Component {
  static navigationOptions = {
    title: 'Admin',
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
      });
      this.setState({ websites });
    } catch (err) {
      console.error(err);
    }
  }

  websiteSettings = website => this.props.navigation.navigate('WebsiteSettings', { website });

  render() {
    const { websites } = this.state;
    return (
      <Container>
        <Content>
          <List
            dataArray={websites}
            renderRow={website => (
              <ListItem
                style={{ height: 100 }}
                button
                onPress={() => this.websiteSettings(website)}
              >
                <Thumbnail square size={80} source={{ uri: website.previewImage }} />
                <Body>
                  <Text> {website.name} </Text>
                  <Text note>{PREVIEW_DOMAIN}/{website.slug}</Text>
                </Body>
                <Right>
                  <Icon name='arrow-forward' />
                </Right>
              </ListItem>
            )}
          />
        </Content>
      </Container>
    );
  }
}

export default AdminScreen;

// @flow
import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import { takeSnapshotAsync } from 'expo';
import {
  Container,
  Spinner,
  Text,
} from 'native-base';
import { upload, base } from '../api';
import { PREVIEW_DOMAIN } from '../constants';

class SavingWebsiteScreen extends Component {
  static navigationOptions = {
    header: 'none',
  };

  componentDidMount() {
    setTimeout(this.capturePreview, 3000);
  }

  capturePreview = async () => {
    const { website } = this.props.navigation.state.params;
    try {
      const result = await takeSnapshotAsync(this.webView, {
        result: 'file',
        height: 400,
        width: 300,
        quality: 1,
        format: 'png',
      });

      const previewImage = await upload(result);

      await base.updateDoc(`Websites/${website.id}`, {
        ...website,
        previewImage,
      });

      this.props.navigation.navigate('Home');
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { website } = this.props.navigation.state.params;

    return (
      <Container style={{ justifyContent: 'space-between', alignItems: 'center', paddingVertical: 64 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 32, marginBottom: 8, fontWeight: '700' }}>{ website.name }</Text>
          <Text style={{ fontSize: 24, marginBottom: 8 }}>Saving</Text>
          <Text style={{ fontSize: 16, fontWeight: '700' }}>https://oncosmos.herokuapp.com/{ website.slug }</Text>
        </View>
        <View
          style={{
            width: 300,
            height: 400,
            borderRadius: 4,
            overflow: 'hidden',
          }}
        >
          <WebView
            ref={el => (this.webView = el)}
            source={{ uri: `${PREVIEW_DOMAIN}/${website.slug}` }}
            style={{ flex: 1 }}
          />
          <View
            ref={el => (this.ugh = el)}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: '#000',
              opacity: 0.5,
              justifyContent: 'center',
            }}
          >
            <Spinner color='white' />
          </View>
        </View>
        <View />
      </Container>
    );
  }
}

export default SavingWebsiteScreen;

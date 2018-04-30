// @flow
import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import Modal from 'react-native-modal';
import {
  Button,
  Text,
  Icon,
  Content,
  List,
  ListItem,
} from 'native-base';
import { upload } from '../api';
import Masonry from 'react-native-masonry';


type Props = {
  block: {
    id: String,
    src: ?String,
  },
  onSave: () => void,
  onCancel: () => void,
}

class ImageBlockModal extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: true,
      needsUpload: false,
      block: props.block,
      unsplashActive: false,
      unsplashPhotos: [],
    };
  }


  getPermissions = async () => {
    const { status: s1 } = await Permissions.askAsync(Permissions.CAMERA);
    const { status: s2 } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    return s1 === 'granted' && s2 === 'granted';
  }

  takePhoto = async () => {
    const canAccess = await this.getPermissions();
    if (!canAccess) return;

    this.setState({ modalVisible: false });
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this.handleImagePicked(result);
  };

  pickImage = async () => {
    const canAccess = await this.getPermissions();
    if (!canAccess) return;

    this.setState({ modalVisible: false });
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    this.handleImagePicked(result);
  };

  handleImagePicked = async (result) => {
    try {
      if (!result.cancelled) {
        this.setState({
          block: { ...this.state.block, src: result.uri },
          needsUpload: true,
          modalVisible: true,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  handleRemoveImage = () => this.setState({
    block: { ...this.state.block, src: null },
    needsUpload: false,
  })

  handleSave = async () => {
    const { block, needsUpload } = this.state;
    let { src } = block;

    if (needsUpload) {
      src = await upload(block.src);
    }

    this.props.onSave({
      ...block,
      src,
    });
  }

  loadUnsplash = async () => {
    try {
      const res = await fetch('https://api.unsplash.com/photos/curated?per_page=30', {
        method: 'GET',
        headers: {
          Authorization: 'Client-ID 224472c7f44886281847b7d9ee7b6153917df82e6d49a9de1042a1aca6502d19',
        },
      });
      const json = await res.json();
      const unsplashPhotos = json.map(p => ({
        uri: p.urls.small,
        data: {
          src: p.urls.regular,
        },
        onPress: this.chooseFromUnsplash,
      }));
      this.setState({ unsplashPhotos, unsplashActive: true });
    } catch (err) {
      console.error(err);
    }
  }

  chooseFromUnsplash = ({ src }) => this.setState({
    unsplashActive: false,
    block: { ...this.state.block, src },
  });

  render() {
    const {
      modalVisible,
      block,
      unsplashActive,
      unsplashPhotos,
    } = this.state;

    return (
      <Modal isVisible={modalVisible} style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Image Block</Text>
          </View>

          {
            block.src ? (
              <View style={{ flex: 1, marginVertical: 20 }}>
                <Image style={{ flex: 1 }} source={{ uri: block.src }} />
                <Button full danger onPress={this.handleRemoveImage}>
                  <Text> Remove </Text>
                </Button>
              </View>
            ) : (
              unsplashActive ? (
                <View style={{ flex: 1 }}>
                  <Content>
                    <Text style={{ fontSize: 16, textAlign: 'center', marginVertical: 8, fontWeight: '600' }}>New on Unsplash</Text>
                    <Masonry
                      bricks={unsplashPhotos}
                    />
                  </Content>
                </View>
              ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                  <TouchableOpacity onPress={this.takePhoto}>
                    <View style={{
 alignItems: 'center', justifyContent: 'center', backgroundColor: '#efefef', width: 80, height: 80, borderRadius: 6,
}}
                    >
                      <Icon name='ios-camera' />
                      <Text>Camera</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.pickImage}>
                    <View style={{
 alignItems: 'center', justifyContent: 'center', backgroundColor: '#efefef', width: 80, height: 80, borderRadius: 6,
}}
                    >
                      <Icon name='ios-images' />
                      <Text>Photos</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.loadUnsplash}>
                    <View style={{
 alignItems: 'center', justifyContent: 'center', backgroundColor: '#efefef', width: 80, height: 80, borderRadius: 6,
}}
                    >
                      <Icon name='md-camera' />
                      <Text>Unsplash</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )
            )
          }

          <View style={styles.buttonsContainer}>
            <Button style={styles.button} block light onPress={this.props.onCancel}>
              <Text> Cancel </Text>
            </Button>
            <Button style={styles.button} block primary onPress={this.handleSave}>
              <Text> Save </Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  content: {
    justifyContent: 'space-between',
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: 500,
  },
  header: {
    backgroundColor: '#F8F8F8',
    paddingVertical: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 4,
    fontWeight: '700',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 4,
  },
  button: {
    flex: 1,
    margin: 4,
  },
});

export default ImageBlockModal;

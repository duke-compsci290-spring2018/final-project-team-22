import React from 'react';
import { Image, View } from 'react-native';

const WebsiteCard = ({ website }) => (
  <View style={{
    width: 300,
    height: 400,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
 }}
  >
    <Image style={{ flex: 1, borderRadius: 4 }} source={{ uri: website.previewImage }} />
  </View>
);

export default WebsiteCard;

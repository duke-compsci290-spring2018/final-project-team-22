// @flow
import React, { Component } from 'react';
import { View, WebView } from 'react-native';
import { PREVIEW_DOMAIN } from '../constants';

type Props = {
  layout: [],
  editing: Boolean,
  onEdit: () => void,
}

class LayoutPreview extends Component<Props> {
  state = {
    currentMessageId: null,
  }

  componentDidUpdate(prevProps) {
    const { currentMessageId } = this.state;
    const { layout, editing } = this.props;
    const { editing: wasEditing } = prevProps;

    const editingChanged = !editing && wasEditing;

    if (currentMessageId && editingChanged) {
      this.respondToMessage(currentMessageId, { layout });
    }

    if (!currentMessageId && editingChanged) {
      const msg = JSON.stringify({
        id: 'yo',
        data: { layout },
      });
      this.webView.postMessage(msg);
    }
  }

  respondToMessage = (id, data) => {
    const msg = JSON.stringify({
      id,
      data,
    });

    this.webView.postMessage(msg);
  }

  handleInitMessage = ({ id }) => {
    this.respondToMessage(id, { layout: this.props.layout });
  }

  handleEditBlockMessage = ({ id, data: { block } }) => {
    this.setState({ currentMessageId: id });
    this.props.onEdit(block);
  }

  handleMessage = (event) => {
    const message = JSON.parse(event.nativeEvent.data);
    console.info('Message from Browser', message);

    switch (message.type) {
      case 'init':
        this.handleInitMessage(message);
        break;
      case 'editBlock':
        this.handleEditBlockMessage(message);
        break;
      default:
        console.error(`No Handler for Event: ${message.type}`);
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          ref={el => (this.webView = el)}
          onMessage={this.handleMessage}
          source={{ uri: `${PREVIEW_DOMAIN}/edit` }}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}

export default LayoutPreview;

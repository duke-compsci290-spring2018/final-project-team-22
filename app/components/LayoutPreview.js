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
  constructor(props) {
    super(props);

    this.state = {
      currentMessageId: null,
      initLayout: props.layout,
    };
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

  handleMessage = (event) => {
    const message = JSON.parse(event.nativeEvent.data);
    console.info('Message from Browser', message);
    const { id, data: { block } } = message;

    this.setState({ currentMessageId: id });
    this.props.onEdit(block);
  }

  render() {
    const { initLayout } = this.state;
    const injectLayout = `window.Website = ${JSON.stringify({ layout: initLayout })};`;

    return (
      <View style={{ flex: 1 }}>
        <WebView
          ref={el => (this.webView = el)}
          onMessage={this.handleMessage}
          source={{ uri: `${PREVIEW_DOMAIN}edit` }}
          style={{ flex: 1 }}
          injectedJavaScript={injectLayout}
        />
      </View>
    );
  }
}

export default LayoutPreview;

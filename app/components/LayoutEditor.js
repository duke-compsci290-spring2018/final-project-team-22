// @flow
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  View,
  Button,
  Icon,
  Fab,
} from 'native-base';
import _ from 'lodash';
import uuid from 'uuid';

import LayoutPreview from './LayoutPreview';
import TextBlockModal from './TextBlockModal';
import ImageBlockModal from './ImageBlockModal';

type Props = {
  layout: [],
  onSave: () => void,
  onCancel: () => void,
};

class LayoutEditor extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      layout: props.layout,
      activeBlock: null,
      addMenuActive: false,
    };
  }

  handleEdit = block => this.setState({ activeBlock: block });

  handleUpdate = (block) => {
    let { layout } = this.state;

    const exists = layout.find(b => b.id === block.id);

    if (exists) {
      layout = layout.map((b) => {
        if (b.id === block.id) return block;
        return b;
      });
    } else {
      layout.push(block);
    }

    this.setState({ activeBlock: null, layout });
  }

  handleCancel = () => this.setState({ activeBlock: null });

  addTextBlock = () => {
    const block = {
      id: uuid.v4(),
      type: 'Text',
      style: 'body',
    };
    this.setState({ activeBlock: block, addMenuActive: false });
  }

  addImageBlock = () => {
    const block = {
      id: uuid.v4(),
      type: 'Image',
    };
    this.setState({ activeBlock: block, addMenuActive: false });
  }

  saveLayout = () => this.props.onSave({ layout: this.state.layout });

  render() {
    const {
      activeBlock,
      layout,
      addMenuActive,
      settingsMenuActive,
    } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Button iconLeft transparent primary onPress={this.props.onCancel}>
            <Icon name='close' style={{ fontSize: 40, color: '#fff', marginLeft: 20 }} />
          </Button>
          <Button iconLeft transparent primary onPress={this.saveLayout}>
            <Icon name='ios-arrow-round-forward' style={{ fontSize: 40, color: '#fff', marginRight: 20 }} />
          </Button>
        </View>

        <LayoutPreview layout={layout} editing={!!activeBlock} onEdit={this.handleEdit} />

        <Fab
          active={addMenuActive}
          direction='up'
          style={{ backgroundColor: '#007aff' }}
          position='bottomRight'
          onPress={() => this.setState({ addMenuActive: !addMenuActive })}
        >
          <Icon name='add' />
          <Button style={{ backgroundColor: '#34A34F' }} onPress={this.addImageBlock}>
            <Icon name='ios-images' />
          </Button>
          <Button style={{ backgroundColor: '#3B5998' }} onPress={this.addTextBlock}>
            <Icon name='ios-create' />
          </Button>
        </Fab>

        {
          _.get(activeBlock, 'type') === 'Text' &&
          <TextBlockModal
            block={activeBlock}
            onSave={this.handleUpdate}
            onCancel={this.handleCancel}
          />
        }
        {
          _.get(activeBlock, 'type') === 'Image' &&
          <ImageBlockModal
            block={activeBlock}
            onSave={this.handleUpdate}
            onCancel={this.handleCancel}
          />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: '#222',
    paddingTop: 4,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default LayoutEditor;

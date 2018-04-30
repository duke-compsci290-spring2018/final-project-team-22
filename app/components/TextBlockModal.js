// @flow
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Text,
  Textarea,
  Button,
  Segment,
  Picker,
  Form,
  Icon,
  Item,
  Label,
  Input,
} from 'native-base';
import Modal from 'react-native-modal';

type Props = {
  block: {
    type: String,
    id: String,
    text: String,
    style: String,
    color: String,
    alignment: String,
  },
  onSave: () => void,
  onCancel: () => void,
}

class EditTextBlockModal extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      block: props.block,
      tabIndex: 0,
    };
  }

  handleSave = () => this.props.onSave(this.state.block);
  handleChange = name => (
    value => this.setState({ block: { ...this.state.block, [name]: value } })
  )

  render() {
    const { block, tabIndex } = this.state;

    return (
      <Modal isVisible style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Text Block</Text>
            <Segment>
              <Button first active={tabIndex === 0} onPress={() => this.setState({ tabIndex: 0 })}>
                <Text>Text</Text>
              </Button>
              <Button active={tabIndex === 1} onPress={() => this.setState({ tabIndex: 1 })}>
                <Text>Style</Text>
              </Button>
              <Button last active={tabIndex === 2} onPress={() => this.setState({ tabIndex: 2 })}>
                <Text>Link</Text>
              </Button>
            </Segment>
          </View>
          <View style={{ flex: 1, padding: 10 }}>
            { tabIndex === 0 &&
              <Textarea
                style={{
                  fontSize: 20,
                  flex: 1,
                  borderWidth: 0,
                }}
                placeholder='Write here'
                value={block.text}
                onChangeText={this.handleChange('text')}
              />
            }

            {
              tabIndex === 1 &&
              <Form>
                <Item stackedLabel>
                  <Label>Text Style</Label>
                  <Picker
                    mode='dropdown'
                    iosHeader='Text Style'
                    headerBackButtonText='Done'
                    iosIcon={<Icon name='ios-arrow-down-outline' />}
                    selectedValue={block.style}
                    onValueChange={this.handleChange('style')}
                  >
                    <Picker.Item label='Header 1' value='h1' />
                    <Picker.Item label='Header 2' value='h2' />
                    <Picker.Item label='Header 3' value='h3' />
                    <Picker.Item label='Body' value='body' />
                  </Picker>
                </Item>
                <Item stackedLabel>
                  <Label>Text Color</Label>
                  <Input
                    value={block.color}
                    onChangeText={this.handleChange('color')}
                  />
                </Item>
                <Item stackedLabel>
                  <Label>Text Alignment</Label>
                  <Picker
                    mode='dropdown'
                    iosHeader='Text Alignment'
                    headerBackButtonText='Done'
                    iosIcon={<Icon name='ios-arrow-down-outline' />}
                    selectedValue={block.alignment}
                    onValueChange={this.handleChange('alignment')}
                  >
                    <Picker.Item label='Left' value='left' />
                    <Picker.Item label='Center' value='center' />
                    <Picker.Item label='Right' value='right' />
                  </Picker>
                </Item>
              </Form>
            }

            {
              tabIndex === 2 &&
              <Form>
                <Item stackedLabel>
                  <Label>Add a Link</Label>
                  <Input
                    keyboardType='url'
                    value={block.href}
                    onChangeText={this.handleChange('href')}
                  />
                </Item>
              </Form>
            }
          </View>
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
    overflow: 'hidden',
    backgroundColor: 'white',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: 400,
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

export default EditTextBlockModal;

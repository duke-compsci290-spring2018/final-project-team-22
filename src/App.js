// @flow
import React, { Component } from 'react';
import classes from 'classnames';

import TextBlock from './components/TextBlock';
import ImageBlock from './components/ImageBlock';
import EmptyBlock from './components/EmptyBlock';

type Props = {
  layout: [],
  editMode: Boolean,
};

class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      layout: props.layout,
    };
  }

  componentDidMount() {
    document.addEventListener('layoutUpdate', ({ detail: { layout } }) => {
      this.setState({ layout });
    });
  }

  editBlock = async (block) => {
    const res = await window.webViewBridge.send('editBlock', { block });
    this.setState({ layout: res.data.layout });
  }

  render() {
    const { layout } = this.state;

    return (
      <div className={classes('container', { 'edit-mode': this.props.editMode })}>
        {
          layout.length === 0 && (
            <div className='no-content'>
              <h3>No Content</h3>
            </div>
          )
        }
        {
          layout.map((block) => {
            switch (block.type) {
              case 'Text':
                return <TextBlock key={block.id} block={block} onEdit={this.editBlock} />;
              case 'Image':
                return <ImageBlock key={block.id} block={block} onEdit={this.editBlock} />;
              default:
                return <EmptyBlock key={block.id} block={block} onEdit={() => {}} />;
            }
          })
        }
      </div>
    );
  }
}

export default App;

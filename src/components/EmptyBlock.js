// @flow
import React from 'react';

type Props = {
  block: {},
  onEdit: () => void,
}

const EmptyBlock = (props: Props) => (
  <div className='empty-block' onClick={() => props.onEdit(props.block)}>
    <div className='inner'>
      <i className='icon ion-plus-round' />
    </div>
  </div>
);

export default EmptyBlock;

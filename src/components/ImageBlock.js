// @flow
import React from 'react';

type Props = {
  block: {
    src: String,
  },
  onEdit: () => void
}

const ImageBlock = (props: Props) => {
  const { src } = props.block;

  return (
    <div
      className='image-block'
      style={{
        backgroundImage: `url(${src})`,
      }}
      onClick={() => props.onEdit(props.block)}
    />
  );
};

export default ImageBlock;

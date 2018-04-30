// @flow
import React from 'react';

type Props = {
  block: {
    id: String,
    text: String,
    style: 'h1' | 'h2' | 'h3' | 'body',
    alignment: ?String,
    color: ?String,
    href: ?String,
  },
  onEdit: () => void
}

const TextBlock = (props: Props) => {
  const {
    text,
    href,
    style,
    alignment,
    color,
  } = props.block;

  const styles = {};

  if (alignment) styles.textAlign = alignment;
  if (color) styles.color = color;

  let inner;

  switch (style) {
    case 'h1':
      inner = <h1 style={styles}>{text}</h1>;
      break;
    case 'h2':
      inner = <h2 style={styles}>{text}</h2>;
      break;
    case 'h3':
      inner = <h3 style={styles}>{text}</h3>;
      break;
    default:
      inner = <p style={styles}>{text}</p>;
  }

  if (href) {
    return (
      <a className='text-block' href={href} onClick={() => props.onEdit(props.block)}>
        {inner}
      </a>
    );
  }

  return (
    <div className='text-block' onClick={() => props.onEdit(props.block)}>
      {inner}
    </div>
  );
};

export default TextBlock;

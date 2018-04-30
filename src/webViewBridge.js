import uuid from 'uuid';

const promises = {};

window.webViewBridge = {
  send(type, data) {
    return new Promise((resolve, reject) => {
      const id = uuid.v4();
      const msgObj = {
        type,
        data: data || {},
        id,
      };

      const msg = JSON.stringify(msgObj);

      promises[id] = { resolve, reject };

      window.postMessage(msg, '*');
    });
  },
};

document.addEventListener('message', (e) => {
  try {
    const message = JSON.parse(e.data);

    if (promises[message.id]) {
      promises[message.id].resolve(message);
    } else {
      const event = new CustomEvent('layoutUpdate', { detail: { layout: message.data.layout } });
      document.dispatchEvent(event);
    }
  } catch (err) {
    alert('failed to parse message from react-native');
  }
});

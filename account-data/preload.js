// Import the necessary Electron components.
const { ipcRenderer, contextBridge } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
})

// White-listed channels.
const ipc = {
  'render': {
      // From render to main.
      'send': [
          'message:loginShow',
          'message:loginSuccessful'
      ],
      // From main to render.
      'receive': [],
      // From render to main and back again.
      'sendReceive': []
  }
};

// Exposed protected methods in the render process.
contextBridge.exposeInMainWorld(
  // Allowed 'ipcRenderer' methods.
  'ipcRender', {
      // From render to main.
      send: (channel, args) => {
          let validChannels = ipc.render.send;
          if (validChannels.includes(channel)) {
              ipcRenderer.send(channel, args);
          }
      },
      // From main to render.
      receive: (channel, listener) => {
          let validChannels = ipc.render.receive;
          if (validChannels.includes(channel)) {
              // Deliberately strip event as it includes `sender`.
              ipcRenderer.on(channel, (event, ...args) => listener(...args));
          }
      },
      // From render to main and back again.
      invoke: (channel, args) => {
          let validChannels = ipc.render.sendReceive;
          if (validChannels.includes(channel)) {
              return ipcRenderer.invoke(channel, args);
          }
      }
  }
);
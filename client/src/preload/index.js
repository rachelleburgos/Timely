import { contextBridge, ipcRenderer } from 'electron'

// Define custom APIs or import them
const electronAPI = {
  // Add more APIs as needed
}

const api = {
  getEnv: (key) => ipcRenderer.invoke('get-env', key)
  // Custom APIs for renderer
  // Define your custom functions or properties here
}

// Use `contextBridge` to expose Electron and custom APIs to
// the renderer process in a secure way.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error('Error exposing APIs:', error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}

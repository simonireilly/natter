// Electron
import { app, BrowserWindow } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { enableLiveReload } from 'electron-compile';

// Libraries
import Store from 'electron-store';

// Services
import executors from './services/executors';
import parsers from './services/parsers';

// SetUp //
const isDevMode = process.env.NODE_ENV === 'development'
if (isDevMode) {
  enableLiveReload({ strategy: 'react-hmr' });
}
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
const store = new Store({
  name: 'user-preferences',
  defaults: {
    windowBounds: { width: 800, height: 600 }
  }
});

const createWindow = async () => {
  const {width, height} = store.get('windowBounds');
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    backgroundColor: '#2e2c29'
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  if (isDevMode) {
    await installExtension(REACT_DEVELOPER_TOOLS);
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('resize', () => {
    let { width, height } = mainWindow.getBounds();
    store.set('windowBounds', { width, height });
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});



// Encapsulating the speech broadcast callback function
const ipcMain = require( 'electron').ipcMain;

ipcMain.on('speech-broadcast', function(event, data) {
  console.log(`Main Recieved ->`);
  console.log(data);
  parsers['speech'](data);
  executors['robot-js']['string'](data);
});


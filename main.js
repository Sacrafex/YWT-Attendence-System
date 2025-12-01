const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    icon: 'YWT.png',
    width,
    height,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

function safeWriteJSON(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return { success: true };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

ipcMain.handle('save:data', async (_event, payload) => {
  const filePath = path.join(__dirname, 'data.json');
  return safeWriteJSON(filePath, payload);
});

ipcMain.handle('save:config', async (_event, payload) => {
  const filePath = path.join(__dirname, 'config.json');
  return safeWriteJSON(filePath, payload);
});

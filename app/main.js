const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain
const path = require('path')
const url = require('url')

const isDevelopment = process.env.NODE_ENV !== 'production'

let mainWindow

ipc.on('exit', function(event) {
    app.quit();
})

ipc.on('minimize', function(event) {
    mainWindow.minimize();
})

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
      app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
      createMainWindow()
    }
})

app.on('ready', createMainWindow)

function createMainWindow()
{
    mainWindow = new BrowserWindow({
        title: 'chat', 
        minHeight: 500, 
        minWidth: 400,
        //maxHeight: 700,
        //maxWidth: 600,
        frame: false, 
        width: 400, 
        height: 500,
        show: false
    })
    mainWindow.setMenu(null)
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/templates/index.html'),
        protocol: 'file',
        slashes: true
    }))
    mainWindow.webContents.openDevTools()
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })
    mainWindow.on("closed", function () {
        mainWindow = null;
    })
}
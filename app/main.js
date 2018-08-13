const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain
const path = require('path')
const url = require('url')
const isDevelopment = process.env.NODE_ENV !== 'production'
var open = require("open");
let mainWindow

ipc.on('exit', function(event) {
    app.quit();
})

ipc.on('minimize', function(event) {
    mainWindow.minimize();
})

ipc.on('maximize', function(event) {
    mainWindow.maximize();
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
        backgroundColor: "#111010",
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

    if(isDevelopment) {
        mainWindow.webContents.openDevTools()
    }

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.on("closed", function () {
        mainWindow = null;
    })

    // open in default browser when click on link
    mainWindow.webContents.on('will-navigate', (event, url) => {
        event.preventDefault()
        open(url)
    });
}
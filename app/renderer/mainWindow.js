const electron = require('electron');
const ipc = electron.ipcRenderer;
const $ = require('jquery');

// loads html page to #router div
$("#router").hide().load('chat.html').fadeIn('slow')

var exitBtn = document.getElementById('exit')
var minimizeBtn = document.getElementById('minimize')
var maximizeBtn = document.getElementById('maximize')

exitBtn.onclick = function() {
    ipc.send('exit')
}

minimizeBtn.onclick = function() {
    ipc.send('minimize')
}

maximizeBtn.onclick = function() {
    ipc.send('maximize')
}
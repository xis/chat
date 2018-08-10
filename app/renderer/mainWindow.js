const electron = require('electron');
const ipc = electron.ipcRenderer;
const $ = require('jquery');

const router = document.getElementById('router')
$("#router").hide().load('chat.html').fadeIn('slow')

var exitBtn = document.getElementById('exit')
var minimizeBtn = document.getElementById('minimize')

exitBtn.onclick = function() {
    ipc.send('exit')
}

minimizeBtn.onclick = function() {
    ipc.send('minimize')
}
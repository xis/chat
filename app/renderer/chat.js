const electron = require('electron');
const ipc = electron.ipcRenderer;
const $ = require('jquery');
const io = require('socket.io-client')
const anchorme = require('anchorme').default

const socket = io('http://localhost:3000')


const msgInput = document.getElementById("messageInput")
const messageBox = document.getElementById("messageBox")
var username = ""
var result = ""

msgInput.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        if(msgInput.value.includes(":username")) {
            var msg = msgInput.value;
            username = msg.replace(":username ", "")
            msgInput.value = ""
        } else {
            if(msgInput.value != "") {
                send(msgInput.value)
                msgInput.value = ""
            }
        }
      }
})

function send (input) {
    socket.emit('sendMsg', { input, username })
}


socket.on('msgInbound', function(data) {

    var message = document.createElement("div")
    var text = anchorme(data[0],
        {
            truncate: 25 // 25 is the maximum length of the viewed link
        }
    )
    var username = document.createElement("div")
    var usernameText = document.createTextNode("~ " + data[1])
    message.innerHTML = text;
    username.appendChild(usernameText)
    message.setAttribute("class","mymessage")
    username.setAttribute("class","username")
    messageBox.appendChild(message)
    messageBox.appendChild(username)
    
})


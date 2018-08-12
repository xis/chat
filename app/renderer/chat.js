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
    if(data[0].includes("youtube") || data[0].includes("youtu.be")) {
        var videoid = youtubeID(data[0])
        if(videoid != data[0]) { // if url does not contains video id exp: youtube.com
            var videoDiv = document.createElement("div")
            videoDiv.setAttribute("class","video")
            var video = document.createElement("iframe")
            video.setAttribute("width", "360")
            video.setAttribute("height", "215")
            video.setAttribute("frameborder", "0")
            video.setAttribute("src", "https://www.youtube.com/embed/" + videoid)
            videoDiv.appendChild(video)
            message.appendChild(videoDiv)
        }
    }
    
    message.innerHTML = message.innerHTML + text
    username.appendChild(usernameText)
    message.setAttribute("class","mymessage")
    username.setAttribute("class","username")
    messageBox.appendChild(message)
    messageBox.appendChild(username)
    messageBox.scrollTop = messageBox.scrollHeight - messageBox.clientHeight;
})


function youtubeID(url){
    url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return undefined !== url[2]?url[2].split(/[^0-9a-z_\-]/i)[0]:url[0];
}
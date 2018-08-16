const electron = require('electron');
const ipc = electron.ipcRenderer;
const $ = require('jquery');
const io = require('socket.io-client')
var linkify = require('linkifyjs');
var linkifyHtml = require('linkifyjs/html');
const socket = io('http://localhost:3000')

const msgInput = document.getElementById("messageInput")
const messageBox = document.getElementById("messageBox")
var username = ""

msgInput.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        if(msgInput.value.includes("!=username")) {
            var msg = msgInput.value;
            username = msg.replace("!=username ", "")
            msgInput.value = ""        
        }
        if(msgInput.value != "") {
            send(msgInput.value)
            msgInput.value = ""
        }
      }
})

function send (input) {
    socket.emit('sendMsg', { input, username })
}

socket.on('msgInbound', function(data) {
    var message = document.createElement("div")
    message.setAttribute("class","mymessage")

    var text = document.createElement('div')
    var msg = document.createTextNode(data[0])
    text.appendChild(msg)

    var URLs = linkify.find(data[0])
    if(URLs.length > 0) {
        text.innerHTML = linkifyHtml(text.innerHTML,{
            // truncate
            format: {
              url: function (value) {
                return value.length > 40 ? value.slice(0, 40) + '…' : value
              }
            }
        });
    }

    var username = document.createElement("div")
    username.setAttribute("class","username")
    var usernameText = document.createTextNode("~ " + data[1])

    if(data[0].includes("youtube") || data[0].includes("youtu.be")) {
        var videoid = youtubeID(data[0])
        if(videoid != data[0]) { // create video section if url contains video id
            var videoDiv = document.createElement("div")
            videoDiv.setAttribute("class","video")
            var video = document.createElement("iframe")
            video.setAttribute("frameborder", "0")
            video.setAttribute("style", "width: 100%; height: 100%; position: absolute;")
            video.setAttribute("src", "https://www.youtube.com/embed/" + videoid)
            videoDiv.appendChild(video)
            message.setAttribute("style", "width: 60%;")
            message.appendChild(videoDiv)
            messageBox.appendChild(message)
        }
    }
    message.appendChild(text)
    username.appendChild(usernameText)
    messageBox.appendChild(message)
    messageBox.appendChild(username)
    messageBox.scrollTop = messageBox.scrollHeight - messageBox.clientHeight;
})

function youtubeID(url){
    url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return undefined !== url[2]?url[2].split(/[^0-9a-z_\-]/i)[0]:url[0];
}
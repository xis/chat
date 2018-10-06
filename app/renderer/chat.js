const electron = require('electron');
const ipc = electron.ipcRenderer;
const $ = require('jquery');
const _ = require('underscore')
const io = require('socket.io-client')
var linkify = require('linkifyjs');
var linkifyHtml = require('linkifyjs/html');
const hljs = require('highlight.js')
const socket = io('http://localhost:3000')

const msgInput = document.getElementById("messageInput")
const messageBox = document.getElementById("messageBox")
var username = ""
var type = ""

msgInput.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        if(msgInput.value != "") {
            var message = msgInput.value

            // get first word and check if it is command or not // this is bad.
            var firstWord = _.first( msgInput.value.split(" ") )
            type = "text"
            switch (firstWord) {
                case "/username":
                username = msgInput.value.replace("/username ", "")
                type = "set-username"
                break;
                case "/code": 
                message = msgInput.value.replace("/code ", "")
                type = "code"
                break;
            }
            if(type != "set-username") {
                send(message)
            }
            msgInput.value = ""
        }
      }
})

function send (input) {
    socket.emit('sendMsg', { input, username, type })
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

    // Draw username section
    var username = document.createElement("div")
    username.setAttribute("class","username")
    var usernameText = document.createTextNode("~ " + data[1])

    // Check for youtube video and be sure that message type is text
    if (data[2] == "text" && (data[0].includes("youtube") || data[0].includes("youtu.be"))) {
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

    // If message type == code create a pre element
    if(data[2] == "code") {
        var pre = document.createElement("pre")
        pre.setAttribute("class", "code")
        pre.appendChild(text)
        message.setAttribute("style", "background-color: #131513;")
        message.appendChild(pre)
        hljs.highlightBlock(pre)
    } else {
        message.appendChild(text)   
    }
    username.appendChild(usernameText)
    messageBox.appendChild(message)
    messageBox.appendChild(username)
    messageBox.scrollTop = messageBox.scrollHeight - messageBox.clientHeight;
})

function youtubeID(url){
    url = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return undefined !== url[2]?url[2].split(/[^0-9a-z_\-]/i)[0]:url[0];
}
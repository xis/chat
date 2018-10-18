
<div align="center">
  <h1>chat</h1>
  
  [![forthebadge](https://forthebadge.com/images/badges/check-it-out.svg)](https://forthebadge.com)

a chat app that can highlight URLs, youtube videos and codes. 
requires socket-io server, set up your socket-io server before start.
</div>

# to compile
```sh
git clone https://github.com/fopeak/chat.git
cd chat
npm install
npm start
```
# example socket-io server
```js
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('sendMsg', function(value){
        io.sockets.emit('msgInbound', [ value.input, value.myName, value.type ])
    });
});
```

# commands
| command  | for what |
| ------------- | ------------- |
| /username  | to set your username  |
| /code  | to send code  |

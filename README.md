# chat
a chat app that can highlight URLs and youtube videos. 
requires socket-io server, set up your socket-io server before start.

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
        io.sockets.emit('msgInbound', [ value.input, value.username ])
    });
});
```

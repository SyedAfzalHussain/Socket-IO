const express = require('express');
const app = express();
const path = require('path');
const http = require('http').Server(app)
const io = require('socket.io')(http);
const port = 3000;

app.get('/', (req, res)=>{
	res.sendFile(path.join(__dirname + '/index.html'));
	});

//create a new connection 
io.on('connection', socket =>{
	console.log("User is connected with an ID :"+socket.id);
	socket.on('disconnect', ()=>{
		console.log("Client is disconnected ..!");
	})
	socket.on('message', msg=>{
		console.log("Message from Client is : " +msg);
	})
	socket.emit('server', "This message is sending from server to Client ..!")
})

http.listen(port , () =>{
	console.log(`Listening on http://localhost:${port}`)
 });


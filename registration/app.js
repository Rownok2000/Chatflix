var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const port = 3100;
const socketIo = require('socket.io');


const bodyParser = require('body-parser')
const cors = require('cors')

var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var gruppoRouter = require('./routes/gruppo');
var ChatRouter = require('./routes/chat');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(new cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/gruppo', gruppoRouter);

const server = app.listen(port, () => {
  console.log(`Server connection on  http://127.0.0.1:${port}`);  // Server Connnected
});
// Creo un oggetto socketServer sopra  il server Http
socketServer = socketIo(server);
const name = {};
// Per ogni client connesso
socketServer.on('connection', socket => {
    console.log('Socket: client connected');
    //Invio il messaggio ricevuto a tutti i client
    socket.on('new-message', (message) => { 
      socketServer.to(message.groupName).emit('resp-message', message);
    });

    socket.on('change-group', (message) => { 
      socket.join(message.groupName);
      socketServer.to(message.groupName).emit('join-message', message);
    });
    
    //socket.on('leave-group', (message) => { 
      //socket.leave(message.groupName);
      //socketServer.to(message.groupName).emit('leave-message', message);
    //});

    socket.on('new-group-created', (group) => { 
      socketServer.emit('newGroup', group);
      console.log(group);
    });
});

module.exports = app;


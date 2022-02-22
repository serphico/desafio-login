const express = require('express');
const { Server: HttpServer} = require('http');
const { Server: IOServer, Socket} = require('socket.io');
const dotenv = require('dotenv');
const {appRoute, chatRoute} = require('./routes/routes.js');
const chatCt = require('./controllers/chatController.js')
dotenv.config();

const app = express();

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use(express.static('./views'));

app.set('view engine', 'pug');

app.set('views', "./views");

app.use('/', chatRoute);

app.use('/api/productos-test', appRoute);



io.on('connection', (socket) =>{
    console.log('usuario conectado');
    chatCt.readChat()
    .then(res => { 
         io.sockets.emit('messages', res);
         socket.emit('messages', res);

    })


    socket.on('new-messages', (messageData) =>{
        chatCt.readChat()
        .then(res => { 
            io.sockets.emit('messages', res);
    
        })
        chatCt.saveChat(messageData);
    })

})

module.exports = httpServer;

const express = require('express');
const { Server: HttpServer} = require('http');
const { Server: IOServer, Socket} = require('socket.io');
const dotenv = require('dotenv');
const {appRoute, chatRoute, loginRoute} = require('./routes/routes.js');
const chatCt = require('./controllers/chatController.js')
const cookieParse = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const advanceOptions = {useNewUrlParser:true, useUnifiedTopology:true}
dotenv.config();

const app = express();

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(express.json());

app.use(cookieParse());

app.use(session({

    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: advanceOptions
    }),

    secret:'secretPhrase',
    resave: false,
    saveUninitialized: false ,

    cookie:{
        expires: 60000
    }
    
}));

app.use(express.static('./views'));

app.set('view engine', 'pug');

app.set('views', "./views");

app.use('/', loginRoute);

app.use('/chat', chatRoute);

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

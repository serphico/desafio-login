const {Router} = require('express');
const prodGen = require('../controllers/prodGen.js')
const chatCt = require('../controllers/chatController.js')


const appRoute = Router();
const chatRoute = Router();

chatRoute.get('/', (req,res) => {

    res.render('./layouts/index.pug')
})

appRoute.get('/', (req, res) => {
    let products = prodGen();
    res.render('./layouts/productos.pug',{products})
})

module.exports = {appRoute,chatRoute};
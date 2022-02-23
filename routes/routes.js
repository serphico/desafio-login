const {Router} = require('express');
const prodGen = require('../controllers/prodGen.js')


const appRoute = Router();
const chatRoute = Router();
const loginRoute = Router();

chatRoute.get('/', (req,res) => {

    res.render('./layouts/index.pug')
})

appRoute.get('/', (req, res) => {
    console.log(req.session.username)
    if(!req.session.username){
        //res.render('')
        setTimeout(() => {
            res.redirect('/')
        }, 500);
    }else{
        let products = prodGen();
        let user = req.session.username
        res.render('./layouts/productos.pug',{products,user})
    }

})

appRoute.post('/', (req, res) => {
    let user = req.session.username

    req.session.destroy( err =>{
        if(err){
            console.log(err)
        }else{
                res.render('./layouts/byeUser.pug',{user})
        }
    })

})


loginRoute.get('/', (req,res) => {

    res.render('./layouts/login.pug')
})

loginRoute.post('/', (req,res) => {
    console.log(req.body.name)
    req.session.username = req.body.name
    res.redirect('/api/productos-test')
})

module.exports = {appRoute,chatRoute,loginRoute};
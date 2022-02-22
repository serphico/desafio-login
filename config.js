var admin = require("firebase-admin");
const dotenv = require('dotenv');

dotenv.config();

var serviceAccount = require("./assets/ave.json");

const dbFirebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

console.log('Firebase conectada');

const db = admin.firestore();
const queryChat = db.collection('chat')

module.exports = {queryChat, dbFirebase};
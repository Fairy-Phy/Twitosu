const admin = require("firebase-admin");
const config = require("../../config/config.json");

const firebase_cert = require(__dirname + "/../../config/" + config.firebase_cert_path);

admin.initializeApp({
	credential: admin.credential.cert(firebase_cert),
	databaseURL: config.databaseURL
});

module.exports = admin.firestore();
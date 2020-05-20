const fs = require("fs").promises;
const crypto = require("../src/util/crypto_base64");

fs.readFile(__dirname + "/../config/statosu_rsa.pub").then(pub_key => {
	const text = "";

	console.log(crypto.encrypt(text, pub_key));
});
const fs = require("fs").promises;
const crypto = require("../src/util/crypto_base64");

fs.readFile(__dirname + "/../config/statosu_rsa.pem").then(pri_key => {
    const text = "";

    console.log(crypto.decrypt(text, pri_key));
});

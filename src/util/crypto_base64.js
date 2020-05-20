const crypto = require("crypto");

exports.encrypt = (text, public_key) => crypto.publicEncrypt(public_key, Buffer.from(text, "utf8")).toString("base64");
exports.decrypt = (base64_text, private_key) => crypto.privateDecrypt(private_key, Buffer.from(base64_text, "base64")).toString("utf8");
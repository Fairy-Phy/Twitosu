const fs = require("fs").promises;
const config = require("../../config/config.json");
const crypto_base64 = require("./crypto_base64");

module.exports = async twitter_data => {
	const private_key = await fs.readFile(__dirname + "/../../config/" + config.private_key_path);

	return {
		token: crypto_base64.decrypt(twitter_data.twitter_access.token, private_key),
		secret: crypto_base64.decrypt(twitter_data.twitter_access.secret, private_key)
	};
};
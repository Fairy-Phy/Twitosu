const twitter = require("twitter");
const decrypt_key = require("../util/decrypt_key");
const config = require("../../config/config.json");
const log4js = require("../util/logger");
const logger = log4js.getLogger("Tweet");

module.exports = async (twitter_data, image_buffer) => {
	const twitter_access = await decrypt_key(twitter_data);

	const tweet = new twitter({
		consumer_key: config.consumer_key,
		consumer_secret: config.consumer_secret,
		access_token_key: twitter_access.token,
		access_token_secret: twitter_access.secret
	});

	// eslint-disable-next-line no-unused-vars
	const server_name = ["official server", "ripple server"];

	const message = "Test tweet";
	// message = `Todays stats (${server_name[twitter_data.osu_server]})`;

	const media = await tweet.post("media/upload", { media: image_buffer });

	await tweet.post("statuses/update", {
		status: message,
		media_ids: media.media_id_string
	}).catch(error => logger.error(error));
};
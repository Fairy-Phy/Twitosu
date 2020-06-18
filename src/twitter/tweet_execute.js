const framework = require("twitosu-framework");
const config = require("../../config/config.json");
const tweet = require("./tweet");
const log4js = require("../util/logger");
const logger = log4js.getLogger("Tweet");

module.exports = async (twitter_data, player_data) => {
	const image_buffer = await framework.
		create_image(twitter_data, player_data, config.osu_api_key, config.ripple_api_key).
		catch(error => logger.error(error));

	await tweet(twitter_data, image_buffer);
};
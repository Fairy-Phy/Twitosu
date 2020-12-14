const framework = require("twitosu-framework");
const config = require("../../config/config.json");
const tweet = require("./tweet");
const log4js = require("../util/logger");
const logger = log4js.getLogger("Tweet");
const { workerData } = require("worker_threads");

const { twitter_data, player_data } = workerData;

framework.create_image(twitter_data, player_data, config.osu_api_key, config.ripple_api_key)
	.then(async image_buffer => {
		await tweet(twitter_data, image_buffer);
	})
	.catch(error => logger.error(error));

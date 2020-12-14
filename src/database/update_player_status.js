const framework = require("twitosu-framework");
const database = require("./connection_firestore");
const log4js = require("../util/logger");
const logger_cron = log4js.getLogger("Cron");
const logger_db = log4js.getLogger("Database");
const config = require("../../config/config.json");

module.exports = async (twitter_data, tweet_id) => {
	logger_cron.info("Start: Update player status");
	try {
		const get_player_data = await framework.get_osu_status(twitter_data, config.osu_api_key, config.ripple_api_key);

		const player_object = JSON.parse(JSON.stringify(get_player_data));

		const find_player_data = await database.collection("Osu! player statuses").doc(tweet_id);

		await find_player_data.update(player_object);

		logger_db.info(get_player_data.username + ": Status updated");
	}
	catch (error) {
		logger_db.error(error);
	}

	logger_cron.info("End: Update player status");
};
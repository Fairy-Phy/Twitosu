const framework = require("twitosu-framework");
const database = require("./connection_firestore");
const log4js = require("../util/logger");
const logger = log4js.getLogger("Database");
const config = require("../../config/config.json");

module.exports = async (twitter_data, tweet_id) => {
	logger.info("Start: Insert player status");

	const get_player_data = await framework.get_osu_status(twitter_data, config.osu_api_key, config.ripple_api_key);

	//const doc_name = get_player_data.server + "_" + get_player_data.user_id + "_" + get_player_data.mode;
	const player_data_doc = await database.collection("Osu! player statuses").doc(tweet_id);

	const player_object = JSON.parse(JSON.stringify(get_player_data));

	await player_data_doc.set(player_object);

	logger.info("End: Insert player status");

	return player_object;
};
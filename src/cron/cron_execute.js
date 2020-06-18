const database = require("../database/connection_firestore");
const log4js = require("../util/logger");
const insert_player_status = require("../database/insert_player_status");
const tweet_execute = require("../twitter/tweet_execute");
const logger_cron = log4js.getLogger("Cron");
const logger_db = log4js.getLogger("Database");
const logger_tweet = log4js.getLogger("Tweet");

module.exports = async cron_time => {
	logger_cron.info(cron_time + ":00 : Process Start");

	try {
		const find_twitter_data = await database.
			collection("Twitter user configs").
			where("tweet_time", "==", cron_time).
			where("enable", "==", true).
			get();

		logger_db.info(cron_time + ":00 : Database" + find_twitter_data.size + " found");

		if (!find_twitter_data.empty) {
			find_twitter_data.forEach(async twitter_data_doc => {
				const twitter_data = twitter_data_doc.data();

				const find_player_data = await database.
					collection("Osu! player statuses").
					where("server", "==", Number(twitter_data.osu_server)).
					where("username", "==", twitter_data.osu_name).
					where("mode", "==", Number(twitter_data.osu_mode)).
					limit(1).
					get();

				if (find_player_data.empty) {
					const player_data = await insert_player_status(twitter_data);

					tweet_execute(twitter_data, player_data).catch(err => logger_tweet.error(err));
				}
				else {
					tweet_execute(twitter_data, find_player_data.docs[0].data()).catch(err => logger_tweet.error(err));
				}
			});
		}
	}
	catch (error) {
		logger_cron.error(error);
	}

	logger_cron.info(cron_time + ":00 : Process End");
};
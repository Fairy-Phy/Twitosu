const database = require("../database/connection_firestore");
const log4js = require("../util/logger");
const insert_player_status = require("../database/insert_player_status");
const update_player_data = require("../database/update_player_status");
const tweet_execute = require("../twitter/tweet_execute");
const logger_cron = log4js.getLogger("Cron");
const logger_db = log4js.getLogger("Database");
const logger_tweet = log4js.getLogger("Tweet");
const { Worker } = require("worker_threads");

module.exports = async cron_time => {
	logger_cron.info(cron_time + ":00 : Process Start");

	try {
		const find_twitter_data = await database.collection("Twitter user configs")
			.where("tweet_time", "==", cron_time).where("enable", "==", true).get();

		logger_db.info(cron_time + ":00 : Database" + find_twitter_data.size + " found");

		if (!find_twitter_data.empty) {
			find_twitter_data.forEach(async twitter_data_doc => {
				const twitter_data = twitter_data_doc.data();

				const find_player_data = await database.collection("Osu! player statuses").doc(twitter_data_doc.id).get();

				if (!find_player_data.exists) {
					const player_data = await insert_player_status(twitter_data, twitter_data_doc.id);

					new Worker(__dirname + "/../twitter/tweet_execute.js", {
						workerData: {	
							twitter_data,	
							player_data
						}	
					})
					.on("exit", async _ => await update_player_data(twitter_data, twitter_data_doc.id))
					.on("error", error => logger_tweet.error(error));
				}
				else {
					new Worker(__dirname + "/../twitter/tweet_execute.js", {
						workerData: {
							twitter_data,
							player_data: find_player_data.data()
						}
					})
					.on("exit", async _ => await update_player_data(twitter_data, twitter_data_doc.id))
					.on("error", error => logger_tweet.error(error));
				}
			});
		}
	}
	catch (error) {
		logger_cron.error(error);
	}

	logger_cron.info(cron_time + ":00 : Process End");
};
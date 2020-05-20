const framework = require("twitosu-framework");
const database = require("./connection_firestore");
const log4js = require("../util/logger");
const logger_cron = log4js.getLogger("Cron");
const logger_db = log4js.getLogger("Database");
const config = require("../../config/config.json");

module.exports = async () => {
	logger_cron.info("Start: Update player status");

	const find_player_data = await database.collection("Osu! player statuses").get().
		catch(error => {
			logger_db.error(error);
			const _ = {
				empty: true
			};

			return _;
		});

	if (!find_player_data.empty) {
		find_player_data.forEach(async player_data_doc => {
			try {
				const player_data = player_data_doc.data();
				const player_data_object = {
					osu_server: player_data.server,
					osu_name: player_data.username,
					osu_mode: player_data.mode
				};

				const get_player_data = await framework.get_osu_status(player_data_object, config.osu_api_key, config.ripple_api_key);

				const player_object = JSON.parse(JSON.stringify(get_player_data));

				await player_data_doc.ref.update(player_object);

				logger_db.info(player_data.username + ": Status updated");
			}
			catch (error) {
				logger_db.error(error);
			}
		});
	}

	logger_cron.info("End: Update player status");
};
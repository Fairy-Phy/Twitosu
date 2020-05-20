const cron = require("./src/cron/cron");
const log4js = require("./src/util/logger");
const logger = log4js.getLogger("Main");
const { version } = require("./package.json");

logger.info("Welcome to Twitosu.");
logger.info("This version: " + version);

const cron_schedules = cron();

process.on("exit", () => {
	let i = -1;

	cron_schedules.forEach(cron_schedule => {
		if (i === -1) {
			logger.info("cron Update destroying...");
		}
		else {
			logger.info("cron " + i + ":00 destroying...");
		}
		cron_schedule.destroy();
		i++;
	});
	logger.info("Cron destroyed");

	logger.info("Logger shutdown...");
	log4js.shutdown(err => {
		if (err) {
			console.error(err);
		}
	});
});

process.on("SIGINT", () => process.exit());
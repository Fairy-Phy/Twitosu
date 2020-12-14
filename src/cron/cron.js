const cron = require("node-cron");
const cron_execute = require("./cron_execute");
const log4js = require("../util/logger");
const logger = log4js.getLogger("Cron");

module.exports = () => {
	const cron_schedule = [];

	for (let i = 0; i < 24; i++) {
		cron_schedule.push(cron.schedule("0 0 " + i + " * * *", () => cron_execute(i), { timezone: "Europe/London" }));
	}

	logger.info("Ready");

	return cron_schedule;
};
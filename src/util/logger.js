const log4js = require("log4js");
const date = new Date();
const date_string = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}_${date.getHours()}.${date.getMinutes()}.${date.getSeconds()}`;

log4js.configure({
	appenders: {
		out: {
			type: "stdout"
		},
		file: {
			type: "file",
			filename: __dirname + "/../../logs/" + date_string + ".log",
			keepFileExt: true
		}
	},
	categories: {
		default: {
			appenders: ["out"],
			level: "off"
		},
		Main: {
			appenders: ["out", "file"],
			level: "debug"
		},
		Cron: {
			appenders: ["out", "file"],
			level: "info"
		},
		Database: {
			appenders: ["out", "file"],
			level: "info"
		},
		Tweet: {
			appenders: ["out", "file"],
			level: "info"
		}
	}
});

module.exports = log4js;
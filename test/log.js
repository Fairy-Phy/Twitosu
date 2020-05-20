const log4js = require("../src/util/logger");
const logger = log4js.getLogger("Cron");

logger.trace("trace");
logger.debug("debug");
logger.info("info");
logger.warn("warn");
logger.error("error");
logger.fatal("fatal");
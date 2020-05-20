const cron_execute = require("../src/cron/cron_execute");

console.time("Tweet");
cron_execute(12).then(() => console.timeEnd("Tweet"));
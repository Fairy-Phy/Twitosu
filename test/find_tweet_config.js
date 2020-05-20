const database = require("../src/database/connection_firestore");

database.
	collection("Twitter user configs").
	// where("tweet_time", "==", cron_time).
	where("enable", "==", true).
	get().
	then(find_twitter_data => {
		console.log(find_twitter_data.size);
	});
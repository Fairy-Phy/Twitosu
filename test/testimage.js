process.argv.push('debug')

const fs = require('fs')
const framework = require("twitosu-framework");
const config = require("../config/config.json");

const osu_api_key = config.osu_api_key;
const ripple_api_key = config.ripple_api_key

const twitter_data = {
  osu_name: '[Fairy]Phy',
  osu_mode: 3,
  osu_server: 0
}

const db_data = {
  user_id: '4777360',
  username: '[Fairy]Phy',
  join_date: '2014-08-11 02:16:05',
  count300: '16150684',
  count100: '1462748',
  count50: '50626',
  playcount: '19301',
  ranked_score: '1030551234',
  total_score: '7986184236',
  pp_rank: '800000',
  level: '95',
  pp_raw: '8547.03',
  accuracy: '97.30040313720703',
  count_rank_ss: '105',
  count_rank_ssh: '0',
  count_rank_s: '909',
  count_rank_sh: '0',
  count_rank_a: '65',
  country: 'JP',
  total_seconds_played: '1402967',
  pp_country_rank: '45',
  events: []
}

framework.create_image(twitter_data, db_data, osu_api_key, ripple_api_key)
	.then(buffer => {
		fs.writeFile(__dirname + "/" + `./Test_image.png`, buffer, err => {
			console.log(err);
		});
		console.log("End");
	});



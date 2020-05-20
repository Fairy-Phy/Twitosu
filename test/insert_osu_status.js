const framework = require("statosu_framework");
const database = require("../src/database/connection_firestore");
const config = require("../config/config.json");

const player_data = {
	osu_server: 0,
	osu_name: "[Fairy]Phy",
	osu_mode: 3
};

framework.get_osu_status(player_data, config.osu_api_key, config.ripple_api_key).then(async get_player_data => {
	const player_doc = database.collection("Osu! player statuses").doc(get_player_data.server + "_" + get_player_data.user_id + "_" + get_player_data.mode);

	const player_object = JSON.parse(JSON.stringify(new Object(get_player_data)));

	await player_doc.set(player_object, { merge: true });
});
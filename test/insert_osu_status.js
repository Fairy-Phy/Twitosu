const database = require("../src/database/connection_firestore");
const insert_player_status = require("../src/database/insert_player_status");

const player_data = {
	osu_server: 0,
	osu_name: "[Fairy]Phy",
	osu_mode: 3
};

insert_player_status(player_data, "0");

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gamesSchema = new Schema({
	password: {
		type: String,
		required: true,
	},
	playerTurn: {
		type: String,
		default: 1,
	},
	player1: {
		name: {
			type: String,
			required: true,
		},
		win: {
			type: Number,
			default: 0,
		},
	},
	player2: {
		name: {
			type: String,
			required: true,
		},
		win: {
			type: Number,
			default: 0,
		},
	},
	draw: {
		type: Number,
		default: 0,
	},
	gameIsDone: {
		type: Boolean,
		default: false,
	},
	history: {
		type: Schema.Types.ObjectId,
		ref: "History",
	},
	__v: {
		type: Number,
		select: false, // Exclude __v from query results
	},
});

module.exports = mongoose.model("Game", gamesSchema);

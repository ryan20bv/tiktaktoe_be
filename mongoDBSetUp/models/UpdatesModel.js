const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const updatesSchema = new Schema(
	{
		player_1: {
			name: {
				type: String,
				required: true
			},
			win: {
				type: Number,
				default: 0
			}
		},
		player_2: {
			name: {
				type: String,
				required: true
			},
			win: {
				type: Number,
				default: 0
			}
		},
		draw: {
			type: Number,
			default: 0
		},
		player_turn: {
			type: String,
			default: 1
		},
		password: {
			type: String,
			required: true
		},

		game_is_done: {
			type: Boolean,
			default: false
		},
		game_message: {
			type: String,
			default: ''
		},
		history: {
			type: Schema.Types.ObjectId,
			ref: 'History'
		},
		__v: {
			type: Number,
			select: false // Exclude __v from query results
		}
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
);

module.exports = mongoose.model('Update', updatesSchema);

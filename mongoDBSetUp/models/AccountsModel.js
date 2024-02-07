const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const GamesModel = require('./GamesModel');
const UpdatesModel = require('./UpdatesModel');

const accountsSchema = new Schema(
	{
		total_account: {
			type: Number,
			default: 0
		},
		saved_games: {
			type: [UpdatesModel.schema]
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

module.exports = mongoose.model('Account', accountsSchema);

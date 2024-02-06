const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountsSchema = new Schema(
	{
		total_account: {
			type: Number,
			default: 0
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

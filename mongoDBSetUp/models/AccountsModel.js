const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountsSchema = new Schema(
	{
		total_account: {
			type: Number,
			default: 0
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

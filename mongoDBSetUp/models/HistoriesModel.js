const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const historiesSchema = new Schema({
	gameHistory: [
		[
			{
				id: {
					type: String,
					default: "1-1",
				},
				filled: {
					type: Boolean,
					default: false,
				},
				item: {
					type: String,
					default: "",
				},
			},
			{
				id: {
					type: String,
					default: "1-2",
				},
				filled: {
					type: Boolean,
					default: false,
				},
				item: {
					type: String,
					default: "",
				},
			},
			{
				id: {
					type: String,
					default: "1-3",
				},
				filled: {
					type: Boolean,
					default: false,
				},
				item: {
					type: String,
					default: "",
				},
			},
		],
		[
			{
				id: {
					type: String,
					default: "2-1",
				},
				filled: {
					type: Boolean,
					default: false,
				},
				item: {
					type: String,
					default: "",
				},
			},
			{
				id: {
					type: String,
					default: "2-2",
				},
				filled: {
					type: Boolean,
					default: false,
				},
				item: {
					type: String,
					default: "",
				},
			},
			{
				id: {
					type: String,
					default: "2-3",
				},
				filled: {
					type: Boolean,
					default: false,
				},
				item: {
					type: String,
					default: "",
				},
			},
		],
		[
			{
				id: {
					type: String,
					default: "3-1",
				},
				filled: {
					type: Boolean,
					default: false,
				},
				item: {
					type: String,
					default: "",
				},
			},
			{
				id: {
					type: String,
					default: "3-2",
				},
				filled: {
					type: Boolean,
					default: false,
				},
				item: {
					type: String,
					default: "",
				},
			},
			{
				id: {
					type: String,
					default: "3-3",
				},
				filled: {
					type: Boolean,
					default: false,
				},
				item: {
					type: String,
					default: "",
				},
			},
		],
	],
	__v: {
		type: Number,
		select: false, // Exclude __v from query results
	},
});

module.exports = mongoose.model("History", historiesSchema);

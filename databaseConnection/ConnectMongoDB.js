const mongoose = require("mongoose");
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;

const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.2qn5b.mongodb.net/${DB_DATABASE}?retryWrites=true&w=majority`;

const ConnectMongoDB = async () => {
	mongoose.set("strictQuery", false);
	try {
		await mongoose.connect(DB_URL);
		console.log("DATABASE Connected...");
	} catch (err) {
		console.log(err.message);
	}
};
module.exports = ConnectMongoDB;

const express = require("express");
const app = express();
const PORT = process.env.PORT;
const ConnectMongoDB = require("./databaseConnection/ConnectMongoDB");

// for testing
app.use((req, res, next) => {
	res.send("Hello World 123!");
});

app.listen(PORT, async () => {
	await ConnectMongoDB();
	console.log(`Listening to ${PORT}`);
});

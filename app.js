const express = require("express");

const PORT = process.env.PORT;
const ConnectMongoDB = require("./databaseConnection/ConnectMongoDB");

const app = express();

// // games router
const GamesRouter = require("./mongoDBSetUp/routes/game-routes");
app.use("/api/tiktaktoe", GamesRouter);

// for testing
app.use((req, res, next) => {
	res.send("No such route!");
});

app.listen(PORT, async () => {
	await ConnectMongoDB();
	console.log(`Listening to ${PORT}`);
});

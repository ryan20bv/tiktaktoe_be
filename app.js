const express = require("express");

const PORT = process.env.PORT;
const ConnectMongoDB = require("./databaseConnection/ConnectMongoDB");
const cors = require("cors");
const HttpError = require("./mongoDBSetUp/errorHandler/http-error");

const app = express();
app.use(cors({ origin: "https://tik-tak-toe-theta.vercel.app/" }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// game router
const GamesRouter = require("./mongoDBSetUp/routes/game-routes");

app.use("/api/tiktaktoe/game", GamesRouter);

// history router

const HistoryRouter = require("./mongoDBSetUp/routes/history-routes");

app.use("/api/tiktaktoe/history", HistoryRouter);

app.use((req, res, next) => {
	res.send("Hello TIK TAK TOE!");
});

// if no route is Found
app.use((req, res, next) => {
	const error = new HttpError("Route not found", 404);
	throw error;
});

app.use((err, req, res, next) => {
	if (res.headerSent) {
		return next(err);
	}
	res
		.status(err.code || 500)
		.json({ message: err.message || "An unknown error occurred" });
});

app.listen(PORT, async () => {
	await ConnectMongoDB();
	console.log(`Listening to ${PORT}`);
});

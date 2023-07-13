const { validationResult } = require("express-validator");
const HttpError = require("../errorHandler/http-error");
const GamesModel = require("../models/GamesModel");
const HistoriesModel = require("../models/HistoriesModel");
const mongoose = require("mongoose");

/* 
	* @desc        		POST start new game
	! @serverRoute    POST "/api/tiktaktoe"
  	!	@additionalRoute "/new"
	? @access      		public
*/

const startNewGame = async (req, res, next) => {
	const { player1_Name, player2_Name } = req.body;

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// return res.status(400).json({ errors: errors.array() });
		return next(new HttpError("Please enter name and password", 422));
	}

	let newGame = new GamesModel({
		player1: {
			name: player1_Name,
		},
		player2: {
			name: player2_Name,
		},
	});

	let newGameHistory = new HistoriesModel({
		game_id: newGame._id,
		gameHistory: [
			[
				{
					tile_id: "1-1",
				},
				{
					tile_id: "1-2",
				},
				{
					tile_id: "1-3",
				},
			],
			[
				{
					tile_id: "2-1",
				},
				{
					tile_id: "2-2",
				},
				{
					tile_id: "2-3",
				},
			],
			[
				{
					tile_id: "3-1",
				},
				{
					tile_id: "3-2",
				},
				{
					tile_id: "3-3",
				},
			],
		],
	});

	newGame.gameHistory = newGameHistory._id;

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await newGame.save();
		await newGameHistory.save({ session: sess });
		await sess.commitTransaction();
	} catch (err) {
		console.log(err);
		const error = new HttpError("Cant create new Game, please try again", 422);
		return next(error);
	}

	res.status(201).json({ message: "New Game Created" });
};

/* 
	* @desc        		GET get all saved games
	! @serverRoute    get "/api/tiktaktoe"
  	!	@additionalRoute "/allGames"
	? @access      		public
*/

const allSavedGames = async (req, res, next) => {
	let allSavedGames;

	try {
		allSavedGames = await GamesModel.find().populate({ path: "gameHistory" });
	} catch (err) {
		const error = new HttpError("get allSavedGames network error", 500);
		return next(error);
	}

	res.status(201).json({ allSavedGames });
};

/* 
	* @desc        		GET get saved game by game id
	! @serverRoute    get "/api/tiktaktoe"
  	!	@additionalRoute "/game/:game_Id"
	? @access      		public
*/

const getGameByGameId = async (req, res, next) => {
	const game_Id = req.params.game_Id;
	console.log(game_Id);
	let foundGame;

	try {
		foundGame = await GamesModel.findById(game_Id).populate({
			path: "gameHistory",
		});
	} catch (err) {
		const error = new HttpError("get getGameByGameId network error", 500);
		return next(error);
	}

	if (!foundGame) {
		const error = new HttpError("No game found by game id", 500);
		return next(error);
	}

	res.status(201).json({ foundGame });
};

exports.startNewGame = startNewGame;
exports.allSavedGames = allSavedGames;
exports.getGameByGameId = getGameByGameId;

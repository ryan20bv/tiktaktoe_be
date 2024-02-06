const {validationResult} = require('express-validator');
const HttpError = require('../errorHandler/http-error');
const GamesModel = require('../models/GamesModel').default;
const HistoriesModel = require('../models/HistoriesModel');
const mongoose = require('mongoose');
// for authentication
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* 
	* @desc        		POST game access by password
	! @serverRoute    POST "/api/tiktaktoe/game"
  !	@additionalRoute "/access"
	? @access      		public
*/

const accessGame = async (req, res, next) => {
	const {game_id, password} = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Please Password min 4 character', 422));
	}

	let foundGame;
	try {
		foundGame = await GamesModel.findById(game_id);
	} catch (err) {
		const error = new HttpError('accessGame network error', 500);
		return next(error);
	}
	if (!foundGame) {
		const error = new HttpError('No game found by game id', 500);
		return next(error);
	}
	let isPasswordValid = false;
	try {
		isPasswordValid = await bcrypt.compare(password, foundGame.password);
	} catch (err) {
		const error = new HttpError('Could not log you in, please try again!', 500);
		return next(error);
	}
	if (!isPasswordValid) {
		return next(new HttpError('Password is incorrect!', 403));
	}

	const payload = {
		game_id: foundGame._id
	};

	try {
		token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
	} catch (err) {
		const error = new HttpError('cant make token!', 500);
		return next(error);
	}

	res.status(201).json({token});
	// res.status(201).json({ message: "accessGame" });
};

/* 
	* @desc        		POST start new game
	! @serverRoute    POST "/api/tiktaktoe/game"
  	!	@additionalRoute "/new"
	? @access      		public
*/

const startNewGame = async (req, res, next) => {
	const {player1_Name, player2_Name, password} = req.body;

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		// console.log(errors);
		// return res.status(400).json({ errors: errors.array() });
		return next(new HttpError('Please Enter Players name and Password', 422));
	}

	const salt = bcrypt.genSaltSync(12);
	let hashPassword;
	try {
		hashPassword = await bcrypt.hashSync(password, salt);
	} catch (err) {
		const error = new HttpError('Could not create user, please try again!', 500);
		return next(error);
	}

	let newGame = new GamesModel({
		player1: {
			name: player1_Name
		},
		player2: {
			name: player2_Name
		},
		password: hashPassword
	});

	let newGameHistory = new HistoriesModel({
		game_id: newGame._id,
		gameHistory: [
			[
				{
					tile_id: '1-1'
				},
				{
					tile_id: '1-2'
				},
				{
					tile_id: '1-3'
				}
			],
			[
				{
					tile_id: '2-1'
				},
				{
					tile_id: '2-2'
				},
				{
					tile_id: '2-3'
				}
			],
			[
				{
					tile_id: '3-1'
				},
				{
					tile_id: '3-2'
				},
				{
					tile_id: '3-3'
				}
			]
		]
	});

	newGame.history = newGameHistory._id;

	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await newGame.save();
		await newGameHistory.save({session: sess});
		await sess.commitTransaction();
	} catch (err) {
		console.log(err);
		const error = new HttpError('Cant create new Game, please try again', 422);
		return next(error);
	}
	const populatedGame = await newGame.populate({path: 'history'});

	const payload = {
		newGame: populatedGame
	};

	try {
		token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
	} catch (err) {
		const error = new HttpError('cant make token!', 500);
		return next(error);
	}

	res
		.status(201)
		.json({newGame: populatedGame, message: 'New Game Created', token});
};

/* 
	* @desc        		GET get all saved games
	! @serverRoute    get "/api/tiktaktoe/game"
  	!	@additionalRoute "/allGames"
	? @access      		public
*/

const allSavedGames = async (req, res, next) => {
	let allSavedGames;
	const sortQuery = {createdAt: -1};
	try {
		allSavedGames = await GamesModel.find()
			.sort(sortQuery)
			.select('-password -updatedAt')
			.populate({path: 'history'});
	} catch (err) {
		const error = new HttpError('get allSavedGames network error', 500);
		return next(error);
	}

	res.status(200).json({allSavedGames});
};

/* 
	* @desc        		GET get saved game by game id
	! @serverRoute    get "/api/tiktaktoe/game"
  	!	@additionalRoute "/:game_Id"
	? @access      		public
*/

const getGameByGameId = async (req, res, next) => {
	const game_Id = req.params.game_Id;
	let foundGame;

	try {
		foundGame = await GamesModel.findById(game_Id).populate({
			path: 'history'
		});
	} catch (err) {
		const error = new HttpError('get getGameByGameId network error', 500);
		return next(error);
	}

	if (!foundGame) {
		const error = new HttpError('No game found by game id', 500);
		return next(error);
	}

	res.status(201).json({foundGame});
};

/* 
	* @desc        		DELETE  saved game by game id
	! @serverRoute    delete "/api/tiktaktoe/game"
  	!	@additionalRoute "/:game_id"
	? @access      		private need password to delete
*/

const deleteGameById = async (req, res, next) => {
	const {password} = req.body;

	const game_id = req.params.game_id;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(new HttpError('Please Enter Password', 422));
	}

	let foundGame;
	try {
		foundGame = await GamesModel.findById(game_id);
	} catch (err) {
		const error = new HttpError('deleteGameById network error', 500);
		return next(error);
	}
	if (!foundGame) {
		const error = new HttpError('No game found by game id', 500);
		return next(error);
	}
	let isPasswordValid = false;
	try {
		isPasswordValid = await bcrypt.compare(password, foundGame.password);
	} catch (err) {
		const error = new HttpError('Could not log you in, please try again!', 500);
		return next(error);
	}
	if (!isPasswordValid) {
		return next(new HttpError('Password is incorrect!', 403));
	}

	let foundHistory;
	try {
		foundHistory = await HistoriesModel.findById(foundGame.history);
	} catch (err) {
		const error = new HttpError('deleteGameById network error', 500);
		return next(error);
	}

	// forgot to delete the history related to the found game
	try {
		const sess = await mongoose.startSession();
		sess.startTransaction();
		await foundGame.deleteOne();
		await foundHistory.deleteOne({session: sess});
		await sess.commitTransaction();
	} catch (err) {
		console.log(err);
		const error = new HttpError('Cant create new Game, please try again', 422);
		return next(error);
	}

	res.status(201).json({message: 'Delete Game'});
};

exports.accessGame = accessGame;
exports.startNewGame = startNewGame;
exports.allSavedGames = allSavedGames;
exports.getGameByGameId = getGameByGameId;
exports.deleteGameById = deleteGameById;

const HttpError = require('../errorHandler/http-error');
const AccountsModel = require('../models/AccountsModel');
const GamesModel = require('../models/GamesModel');
const UpdatesModel = require('../models/UpdatesModel');

/* 
	* @desc        		GET total account
	! @serverRoute    GET "/api/tiktaktoe/account"
  !	@additionalRoute "/total"
	? @access      		public
*/

const getTotalAccount = async (req, res, next) => {
	let accountData;
	try {
		const response = await AccountsModel.find();
		accountData = response[0];
	} catch (err) {
		const error = new HttpError('get getTotalAccount network error', 500);
		return next(error);
	}

	res.status(200).json({accountData});
};

/* 
	* @desc        		post new total account
	! @serverRoute    POST "/api/tiktaktoe/account"
  !	@additionalRoute "/total_account/create"
	? @access      		public
*/

const createTotalAccount = async (req, res, next) => {
	const newTotalAccount = new AccountsModel({});
	try {
		const totalAccountCount = await AccountsModel.countDocuments();
		if (totalAccountCount > 0) {
			// If there are existing documents, do not create a new one
			return res.status(200).json({message: 'Total account already exists'});
		}
		// If there are no existing documents, create a new one
		await newTotalAccount.save();
	} catch (err) {
		console.log(err);
		const error = new HttpError(
			'Cant create total account, please try again',
			422
		);
		return next(error);
	}

	res
		.status(201)
		.json({data: newTotalAccount, message: 'Account Model Created Successfully'});
};

/* 
	* @desc        		patch total account
	! @serverRoute    PATCH "/api/tiktaktoe/account"
  !	@additionalRoute "/total_account/sync"
	? @access      		public
*/

const syncTotalAccount = async (req, res, next) => {
	let totalAccount;
	try {
		const totalGamesCount = await GamesModel.countDocuments();
		totalAccount = await AccountsModel.findById('65c22918298fd7252796a024');
		totalAccount.total_account = totalGamesCount;
		await totalAccount.save();
	} catch (err) {
		const error = new HttpError('syncTotalAccount network error', 500);
		return next(error);
	}
	res.status(200).json({totalAccount});
};

/* 
	* @desc        		transfer games data to saved_games in account schema
	! @serverRoute    PATCH "/api/tiktaktoe/account"
  !	@additionalRoute "/update_account/saved_games"
	? @access      		public
*/

const transferSavedGames = async (req, res, next) => {
	let newAccountData;
	try {
		const oldSavedGames = await GamesModel.find();
		newAccountData = await AccountsModel.findOne();
		// oldSavedGames.forEach(item => {
		// 	console.log('### item ', item);
		// });
		oldSavedGames.forEach(item => {
			const newData = new UpdatesModel({
				_id: item._id,
				player_1: {...item.player1},
				player_2: {...item.player2},
				draw: item.draw,
				player_turn: item.playerTurn,
				password: item.password,
				games_is_done: item.gamesIsDone,
				game_message: item.gameMessage,
				history: item.history,
				created_at: item.createdAt,
				updated_at: item.updatedAt
			});
			newAccountData.saved_games.push(newData);
		});
		newAccountData.total_account = newAccountData.saved_games.length;
		await newAccountData.save();
	} catch (err) {
		const error = new HttpError('syncTotalAccount network error', 500);
		return next(error);
	}
	res.status(200).json({newAccountData});
};

exports.getTotalAccount = getTotalAccount;
exports.createTotalAccount = createTotalAccount;
exports.syncTotalAccount = syncTotalAccount;
exports.transferSavedGames = transferSavedGames;

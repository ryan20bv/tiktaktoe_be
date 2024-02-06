const HttpError = require('../errorHandler/http-error');
const AccountsModel = require('../models/AccountsModel');
const GamesModel = require('../models/GamesModel');

/* 
	* @desc        		GET total account
	! @serverRoute    GET "/api/tiktaktoe/account"
  !	@additionalRoute "/total"
	? @access      		public
*/

const getTotalAccount = async (req, res, next) => {
	let totalAccount;
	try {
		totalAccount = await AccountsModel.findById('65c22918298fd7252796a024');
	} catch (err) {
		const error = new HttpError('get getTotalAccount network error', 500);
		return next(error);
	}

	res.status(200).json({totalAccount});
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
		.json({totalAccount: newTotalAccount, message: 'total account Created'});
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

exports.getTotalAccount = getTotalAccount;
exports.createTotalAccount = createTotalAccount;
exports.syncTotalAccount = syncTotalAccount;

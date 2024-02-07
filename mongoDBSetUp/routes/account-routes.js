const express = require('express');
const AccountRouter = express.Router();
const accountController = require('../controllers/account-controllers');

/* 
	* @desc        		GET total account
	! @serverRoute    GET "/api/tiktaktoe/account"
  !	@additionalRoute "/total"
	? @access      		public
*/

AccountRouter.get('/total', accountController.getTotalAccount);

/* 
	* @desc        		post new total account
	! @serverRoute    POST "/api/tiktaktoe/account"
  !	@additionalRoute "/total_account/create"
	? @access      		public
*/

AccountRouter.post(
	'/total_account/create',
	accountController.createTotalAccount
);

/* 
	* @desc        		patch total account
	! @serverRoute    PATCH "/api/tiktaktoe/account"
  !	@additionalRoute "/total_account/sync"
	? @access      		public
*/

AccountRouter.patch('/total_account/sync', accountController.syncTotalAccount);

/* 
	* @desc        		transfer games data to saved_games in account schema
	! @serverRoute    PATCH "/api/tiktaktoe/account"
  !	@additionalRoute "/update_account/saved_games"
	? @access      		public
*/

AccountRouter.patch(
	'/update_account/saved_games',
	accountController.transferSavedGames
);

module.exports = AccountRouter;

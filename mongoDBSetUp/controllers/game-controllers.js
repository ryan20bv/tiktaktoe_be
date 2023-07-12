/* 
	* @desc        		GET test route
	! @serverRoute    get "/api/tiktaktoe"
  	!	@additionalRoute "/"
	? @access      		public
*/

const testRoute = async (req, res, next) => {
	res.status(201).json({ message: "Test route" });
};

/* 
	* @desc        		POST start new game
	! @serverRoute    get "/api/tiktaktoe"
  	!	@additionalRoute "/new"
	? @access      		public
*/

const startNewGame = async (req, res, next) => {
	res.status(201).json({ message: "New Game Created" });
};

exports.testRoute = testRoute;
exports.startNewGame = startNewGame;

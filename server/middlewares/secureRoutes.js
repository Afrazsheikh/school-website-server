const jwt = require('jsonwebtoken');
const logger = require('../../config/logger');

module.exports = function checkToken(req, res, next) {
	var token = req.headers['authorization'];
	
	logger.info("New token " + token); 
	logger.debug("Headers " + JSON.stringify(req.headers)); 
	
	if(token) 
	{
		token = req.headers['authorization'].slice(7);
		jwt.verify(token, 'school73(*#$!@^&%vox',async (err,decode) => {
			logger.info("JWT decode: " + JSON.stringify(decode));
			if(err) 
			{
				logger.info("JWT err: " + err);
				res.status(401).json({"success": false, "message": "TOKEN EXPIRED"});
			} 
			else 
			{
				req.payload = decode;
				next();
			}
		});
	} 
	else {
		res.status(401).json({"success":false, "message":"NO TOKEN PROVIDED"});
	}

};
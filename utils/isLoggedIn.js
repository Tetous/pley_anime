const isLoggedIn = (req,res,next) => {
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect("/Login")
	}
};

module.exports = isLoggedIn;
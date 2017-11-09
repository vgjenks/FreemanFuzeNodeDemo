module.exports = (req, res, next) => {
	let sess = req.session;
	let user = sess.user;
	if (user) {
		console.log("auth.js: User session found: " + user.username + ", Expires: " + sess.expires);
		next();
	} else {
		console.log("auth.js: User session NOT found!");
		next(new Error(403)); //Forbidden fruit...
	}
};

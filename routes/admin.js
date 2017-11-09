var express = require("express");

const auth = require("../lib/auth");
const UserService = require("../lib/service/user_service");

var router = express.Router();

/* GET home page. */
router.get("/home", auth, function(req, res, next) {
	let userSvc = new UserService(req.uow);
	userSvc.getAll((err, users) => {
		if (err) res.status(500);
		res.render("admin_home", {
			title: "Hey admin, here are some users:", 
			users: users 
		});
	});
});

module.exports = router;

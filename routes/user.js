/**
 * This is a router/controller which defines endpoints.
 */
const auth = require("../lib/auth");
const express = require("express");
const router = express.Router();

const UserService = require("../lib/service/user_service");

/**
 * MVC UI endpoints 
 */
router.get("/home", (req, res, next) => {
	res.render("user_home");
});

router.get("/login", (req, res, next) => {
	res.render("login");
});

router.post("/login", (req, res, next) => {
	let user = req.body;
	let userSvc = new UserService(req.uow);
	userSvc.login(user, (err, authUser) => {
		if (err) {
			if (err.message) res.send(`Error! ${err.message}`);
		} else {
			req.session.user = authUser[0];
			res.redirect("/admin/home");
		}
	});
});

router.post("/logout", auth, (req, res, next) => {
	req.session.user = null;
	res.locals.session = req.session;
	res.redirect("/user/home");
});

router.get("/create", auth, (req, res, next) => {
	res.render("user_edit", {
		user: {},
		action: "/user/create"
	});
});

router.post("/create", auth, (req, res, next) => {
	let user = req.body;
	let userSvc = new UserService(req.uow);
	userSvc.create(user, (err, result) => {
		if (err) {
			if (err.message) res.send(`Error! ${err.message}`);
		} else {
			res.redirect("/admin/home");
		}
	});
});

router.get("/edit/:id", auth, (req, res, next) => {
	let userID = req.params.id;
	let userSvc = new UserService(req.uow);
	userSvc.getByID(userID, (err, result) => {
		res.render("user_edit", {
			user: result[0],
			action: `/user/edit/${userID}`
		});
	});
});

router.post("/edit/:id", auth, (req, res, next) => {
	let userID = req.params.id;
	let user = req.body;
	user.user_id = userID;
	let userSvc = new UserService(req.uow);
	userSvc.update(user, (err, result) => {
		if (err) {
			if (err.message) res.send(`Error! ${err.message}`);
		} else {
			res.redirect("/admin/home");
		}
	});
});

router.post("/delete/:id", auth, (req, res, next) => {
	let userID = req.params.id;
	let userSvc = new UserService(req.uow);
	userSvc.delete(userID, (err, result) => {
		if (err) {
			if (err.message) res.send(`Error! ${err.message}`);
		} else {
			res.redirect("/admin/home");
		}
	});
});

module.exports = router;

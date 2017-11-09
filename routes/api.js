/**
 * RESTful API - differs only in response.
 */
const express = require("express");
const router = express.Router();

const UserService = require("../lib/service/user_service");

router.get("/users", (req, res, next) => {
	let userSvc = new UserService(req.uow);
	userSvc.getAll((err, users) => {
		if (err) res.status(500);
		res.json(users);
	});
});

router.post("/user", (req, res, next) => {
	let user = req.body;
	let userSvc = new UserService(req.uow);
	userSvc.create(user, (err, result) => {
		if (err) {
			if (err.message) res.status(500).send(`Error! ${err.message}`);
		} else {
			user.user_id = result.insertId;
			res.status(200).send(user);
		}
	});
});

router.put("/user/:id", (req, res, next) => {
	let userID = req.params.id;
	let user = req.body;
	user.user_id = userID;
	let userSvc = new UserService(req.uow);
	userSvc.update(user, (err, result) => {
		if (err) {
			if (err.message) res.status(500).send(`Error! ${err.message}`);
		} else {
			res.status(200).send({ message: `Success! ${userID} updated.`});
		}
	});
});

router.delete("/user/:id", (req, res, next) => {
	let userID = req.params.id;
	let userSvc = new UserService(req.uow);
	userSvc.delete(userID, (err, result) => {
		if (err) {
			if (err.message) res.status(500).send(`Error! ${err.message}`);
		} else {
			res.status(200).send({ message: `Success! ${userID} deleted.`});
		}
	});
});

module.exports = router;

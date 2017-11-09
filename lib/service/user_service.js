/**
 * Service classes are where all the magic happens. Data access
 * comes together with business logic to create a thing of beauty.
 * Other classes, functions, patterns, etc. may be called from here
 * as well to keep things clean and simple.
 */
const UserRepository = require("../repository/user_repository");

class UserService {
	constructor(uow) {
		this.userRepo = new UserRepository(uow);
	}

	getAll(callback) {
		this.userRepo.getAll((err, result) => {
			if (err) return callback(err, null);
			return callback(null, result);
		});
	}

	getByID(userID, callback) {
		this.userRepo.getByID(userID, (err, result) => {
			if (err) return callback(err, null);
			return callback(null, result);
		});
	}

	login(user, callback) {
		this.userRepo.login(user, (err, result) => {
			if (err) return callback(err, null);
			return callback(null, result);
		});
	}

	setActiveFlag(user) {
		if (user.active === "on") {
			user.active = true;
		} else {
			user.active = false;
		}
		return user;
	}

	create(user, callback) {
		user = this.setActiveFlag(user);
		this.userRepo.create(user, (err, result) => {
			if (err) return callback(err, null);
			return callback(null, result);
		});
	}

	update(user, callback) {
		user = this.setActiveFlag(user);
		this.userRepo.update(user, (err, result) => {
			if (err) return callback(err, null);
			return callback(null, result);
		});
	}

	delete(userID, callback) {
		this.userRepo.delete(userID, (err, result) => {
			if (err) return callback(err, null);
			return callback(null, result);
		});
	}
}

module.exports = UserService;
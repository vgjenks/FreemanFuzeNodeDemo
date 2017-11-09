/**
 * A Repository is just that - data access to a particular table
 * or set of tables. It's a way of encapsulating the lowest form
 * of data access for use in service classes, keeping clean
 * separation between data, business logic, and clients.
 */
const INSERT_USER = `
	insert into user (
		username,
		password,
		created,
		active
	)
	values (
		?, ?, curdate(), ?
	)
`;

const UPDATE_USER = `
	update 
		user
	set
		username = ?,
		password = ?,
		active = ?
	where 
		user_id = ?
`;

class UserRepository {
	constructor(uow) {
		this.uow = uow;
	}

	getAll(callback) {
		this.uow.query("select * from user", [], (err, result) => {
			if (err) return callback(err, null);
			return callback(null, result);
		});
	}

	getByID(userID, callback) {
		this.uow.query("select * from user where user_id = ?", [userID], (err, result) => {
			if (err) return callback(err, null);
			return callback(null, result);
		});
	}

	login(user, callback) {
		this.uow.query("select * from user where username = ? and password = ? and active = 1", [user.username, user.password], (err, result) => {
			if (err) return callback(err, null);
			if (!result || result.length < 1) {
				err = { message: "User not found" };
				return callback(err, null);
			}
			return callback(null, result);
		});
	}

	create(user, callback) {
		let params = [
			user.username,
			user.password,
			user.active
		];
		this.uow.query(INSERT_USER, params, (err, result) => {
			if (err) return callback(err, null);
			return callback(null, result);
		});
	}

	update(user, callback) {
		let params = [
			user.username,
			user.password,
			user.active,
			user.user_id
		];
		this.uow.query(UPDATE_USER, params, (err, result) => {
			if (err) return callback(err, null);
			return callback(null, result);
		});
	}

	delete(userID, callback) {
		this.uow.query("delete from user where user_id = ?", [userID], (err, result) => {
			if (err) return callback(err, null);
			return callback(null, result);
		});
	}
}

module.exports = UserRepository;
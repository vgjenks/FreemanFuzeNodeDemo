const express = require("express");
const session = require("express-session");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const UnitOfWork = require("./lib/data/UnitOfWorkFactory");
const index = require("./routes/index");
const api = require("./routes/api");
const user = require("./routes/user");
const admin = require("./routes/admin");

const app = express();

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//cookies setup
app.use(session({ secret: "shhhdonttellanyone", cookie: { maxAge: 1000000 }}));

//make session availble to views
app.use((req, res, next) => {
	res.locals.session = req.session;
	next();
});

//UoW complete transaction & close connection at end of request
app.use((req, res, next) => {
	function complete() {
		if (req.uow) {
			req.uow.complete();
		}
	}
	res.on("finish", complete);
	res.on("close", complete);
	next();
});

//UoW per-request
app.use((req, res, next) => {
	UnitOfWork.create((err, uow) => {
		if (err) console.log(`ERROR: Connection failure in app.js: ${err}`);
		req.uow = uow;
		next();
	});
});

app.use("/", index);
app.use("/api", api);
app.use("/user", user);
app.use("/admin", admin);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;

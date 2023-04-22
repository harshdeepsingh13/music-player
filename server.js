const dotenv = require('dotenv');
//env init
let envFilePath = "./.env"
// if (process.env.MODE === "dev") envFilePath = "./.env-dev"
dotenv.config({path: envFilePath});

const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const logger = require("./services/logger");
const mongooseConnection = require('./services/mongooseConnection');
const v1Routes = require('./api/v1');
const errorMiddleware = require('./middlewares/errorMiddleware');
const path = require('path');

//init
const app = express();
const port = process.env.PORT || 8001;
mongooseConnection();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(cors());

//API routes
app.use("/api/v1", v1Routes);

//error handler
app.use(errorMiddleware);

//react
if (process.env.MODE === 'production') {
	app.use(express.static('./build'));
	app.get('/*', (req, res) => {
		res.sendFile(path.join(__dirname, './build/index.html'))
	})
}

app.listen(port, () => logger.info(`Server is running on port - ${port}`));

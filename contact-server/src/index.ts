require("dotenv").config();

import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";

import routes from "./routes";

const app = express();

app.use(require("cors")());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.use(routes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running here: http://localhost:${process.env.PORT}`);
});
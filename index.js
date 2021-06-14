import express from "express";
import bodyParser from "body-parser";

import Routes from "./routes/OnlineExam.js";

const app = express();
const PORT = 8000;

app.use(bodyParser.json());

app.use("/", Routes);

app.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));

app.listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`));

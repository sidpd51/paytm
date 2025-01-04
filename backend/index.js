const express = require("express");
const mainRouter = require("./routes/index");
const cors = require("cors");
const { PORT } = require("./config/serverConfig");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", mainRouter);

app.listen(PORT, () => {
    console.log("server is listening on port: 3000");
});

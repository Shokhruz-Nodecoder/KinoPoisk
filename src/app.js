const express = require("express");
const config = require("../config");
const routes = require("./routes");
const cors = require("cors");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/errorHandler.middleware");

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileupload());
app.use(express.static(process.cwd() + "/uploads"));
app.use(routes);

app.use(errorHandler)

const bootstrap = async (req, res) => {
  app.listen(config.port, () => {
    console.log(
      `- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -`
    );
    console.log(`                             Listening on ${config.port}`);
    console.log(
      `- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -`
    );
  });
};
bootstrap();

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { corsConfig } from "./config/cors.js";
import errorMiddleware from "./middlewares/error.middleware.js";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({
    path: ".env",
  });
}
//middleswares
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsConfig));
app.use(express.static("public"));

app.route("/").get((req, res) => {
  res.send("Welcome to Harsh Portfolio!");
});

// import routes
import mailRoute from "./routes/mail.route.js";
import { connectDB } from "./database/db.connection.js";

// declare routes
app.use("/api/v1", mailRoute);

// Error handler middleware
app.use(errorMiddleware);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} Mode`
      );
    });
  })
  .catch((error) => console.log("MONGO db connection failed!!! " + error));

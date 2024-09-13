import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/singout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import morgan from "morgan";

const app = express();
app.set("trust proxy", true); // as we are using nginx proxy
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use(signupRouter);
app.use(signinRouter);
app.use(currentUserRouter);
app.use(signoutRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) throw new Error("JWT KEY Must be defined");

  console.log("Starting the server.....");
  try {
    console.log("Connecting to Mongo....");

    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {
      serverSelectionTimeoutMS: 50000,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }

  app.listen(3000, () => {
    console.log("Server is running on port 3000!!!@#!@#!!!");
  });
};

start();

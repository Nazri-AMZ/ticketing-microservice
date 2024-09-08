import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/singout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handle";

const app = express();
app.use(json());

app.use(signupRouter);
app.use(signinRouter);
app.use(currentUserRouter);
app.use(signoutRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000!!!@#!@#!!!");
});

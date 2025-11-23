import express from "express";
import dotenv from "dotenv";
import path from "path";
import ConnectDB from "./lib/db.js";
import cookieParser from 'cookie-parser'

import authRoutes from "./routes/auth.routes.js";
import messageRoute from "./routes/message.routes.js";
import { connect } from "http2";
dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoute);
// make ready for deplolymeent
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}...`);
  ConnectDB()
});

import express from "express";
import { connect } from "./lib/db.js";
import cors from "cors";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import project from "../backend/routes/project.js";
import { v2 as cloudinary } from "cloudinary";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
dotenv.config(); 

app.use(fileUpload({ useTempFiles: true }));
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRETE,
});

app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Server is Live" });
});

app.use("/api/create-project", project);

connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`http://localhost:${port}`);
      });
    } catch (error) {
      console.log("can not connect to server" + error.message);
    }
  })
  .catch((error) => {
    console.log("invalid database connection" + error.message);
  });

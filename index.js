import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyparser.json({ limit: "30mb", extended: true }));

app.use("/users", userRoutes);
app.get("/", (req, res) => {
  res.send("SERVER IS RUNNING");
});
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
  )
  .catch((error) => console.error(error.message));

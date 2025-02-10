const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const fs = require("fs");
const path = require("path");

const corsConfig = require("./config/corsConfig");

dotenv.config();

const sundaeOptions = JSON.parse(
  fs.readFileSync("./const/sundae-options.json", "utf-8")
);

const app = express();
app.use(cors(corsConfig.corsOptions));

app.use("/", express.static(path.join(__dirname, "public")));
app.use(
  "/favicon.ico",
  express.static(path.join(__dirname, "public", "favicon.ico"))
);
app.get("/scoops", (_, res) => {
  res.status(200).json({ message: "", data: sundaeOptions.scoops });
});
app.get("/toppings", (_, res) => {
  res.status(200).json({ message: "", data: sundaeOptions.toppings });
});
app.post("/order", (_, res) => {
  const orderNumber = Math.floor(Math.random() * 10000000000);

  res.status(201).json({ message: "", data: { orderNumber } });
});

if (require.main === module) {
  app.listen(process.env.PORT, () => {
    console.log(`Server launched at port ${process.env.PORT} 🚀`);
  });
}

module.exports = app;

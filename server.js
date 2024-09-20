const cors = require("cors");
const express = require("express");
const fs = require("fs");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.static("public"));

const sundaeOptions = JSON.parse(
  fs.readFileSync("./sundae-options.json", "utf-8")
);

app.get("/scoops", (_, res) => {
  res.json(sundaeOptions.iceCreamFlavors);
});

app.get("/toppings", (_, res) => {
  res.json(sundaeOptions.toppings);
});

app.post("/order", (_, res) => {
  const orderNumber = Math.floor(Math.random() * 10000000000);

  res.status(201).json({ orderNumber });
});

if (require.main === module) {
  app.listen(4000, () => console.log("Sundae server listening on port 4000!"));
}

module.exports = app;

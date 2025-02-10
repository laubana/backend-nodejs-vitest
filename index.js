const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const fs = require("fs");
const path = require("path");

const corsConfig = require("./config/corsConfig");

dotenv.config();

const SUNDAE_OPTIONS = {
  scoops: [
    {
      name: "Mint chip",
      imageUrl: "images/mint-chip.png",
    },
    {
      name: "Vanilla",
      imageUrl: "images/vanilla.png",
    },
    {
      name: "Chocolate",
      imageUrl: "images/chocolate.png",
    },
    {
      name: "Salted caramel",
      imageUrl: "images/salted-caramel.png",
    },
  ],
  toppings: [
    {
      name: "M&Ms",
      imageUrl: "images/m-and-ms.png",
    },
    {
      name: "Hot fudge",
      imageUrl: "images/hot-fudge.png",
    },
    {
      name: "Peanut butter cups",
      imageUrl: "images/peanut-butter-cups.png",
    },
    {
      name: "Gummi bears",
      imageUrl: "images/gummi-bears.png",
    },
    {
      name: "Mochi",
      imageUrl: "images/mochi.png",
    },
    {
      name: "Cherries",
      imageUrl: "images/cherries.png",
    },
  ],
};

const app = express();
app.use(cors(corsConfig.corsOptions));

app.use("/", express.static(path.join(__dirname, "public")));
app.use(
  "/favicon.ico",
  express.static(path.join(__dirname, "public", "favicon.ico"))
);
app.get("/scoops", (_, res) => {
  res.status(200).json({ message: "", data: SUNDAE_OPTIONS.scoops });
});
app.get("/toppings", (_, res) => {
  res.status(200).json({ message: "", data: SUNDAE_OPTIONS.toppings });
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

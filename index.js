const express = require("express");
const cors = require("cors");
const routerApi = require("./routes");
const {errorHandler, logErrors, boomErrorHandler} = require("./middlewares/error.handler");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware para recibir informacion json enviada por metodo post
app.use(express.json());

const websiteList = ["http://127.0.0.1:5500", "http://mydomain.co"];
const options = {
  origin: (origin, callback) => {
    if (websiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("No permitido", false));
    }
  }
}

app.use(cors(options));

app.get("/", (req, res) => {
  res.send("Hola mi server en express");
});

app.get("/nueva-ruta", (req, res) => {
  res.send("Hola, soy una nueva ruta");
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Mi port " + PORT);
});

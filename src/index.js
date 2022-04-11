const express = require("express"), morgan = require("morgan"), fs = require("fs");
const path = require("path");
const app = express();

// middlewares
app.set("port", process.env.PORT || 3000);
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

// rutas
app.use(require("./routes/templatesRoutes")); // Rutas de los templates
app.use("/generate", require("./routes/generatePdfRoutes")) // Rutas de los PDF's

app.listen(app.get("port"), () => {
    console.log("Servidor iniciado");
})

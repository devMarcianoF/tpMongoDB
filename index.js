const express = require("express");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const port = process.env.PORT || 3000;
const dbURL = process.env.dbURL;

mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("[DATABASE] Connected");
    })
    .catch((error) => {
        console.error("Erreur de connexion :", error);
        process.exit(1);
    });

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Bienvenue sur l'API REST Medium");
});

app.use("/api/articles", require("./routes/articleRoutes"));

app.listen(port, () => {
    console.log(`[SERVER] Le serveur est connecté au port : ${port}`);
});

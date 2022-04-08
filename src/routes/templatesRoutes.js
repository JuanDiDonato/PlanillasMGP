const { Router } = require("express"), { setClausuraPdf } = require("../controllers/clausuraController"),
    path = require("path"), router = Router();


router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname.split("routes")[0], "templates", "index.html"))
})

router.get("/clausura", (req, res) => {
    res.sendFile(path.join(__dirname.split("routes")[0], "templates", "clausura.html"))
})

router.get("/inspeccion", (req, res) => {
    res.sendFile(path.join(__dirname.split("routes")[0], "templates", "inspeccion.html"))
})

router.get("/cpublica", (req, res) => {
    res.sendFile(path.join(__dirname.split("routes")[0], "templates", "constatacion_publica.html"))
})

router.get("/constatacion", (req, res) => {
    res.sendFile(path.join(__dirname.split("routes")[0], "templates", "constatacion.html"))
})

module.exports = router;
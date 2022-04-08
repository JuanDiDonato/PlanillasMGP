const {Router} = require("express"), router = Router(), 
    {setClausuraPdf} = require("../controllers/clausuraController"),
    {setConstatacionPDF} = require("../controllers/constatacionController"),
    {setInspeccionPDF} = require("../controllers/inspeccionController"),
    {setCpublicaPDF} = require("../controllers/cpublicaController");

router.get("/clausura", setClausuraPdf);
router.get("/constatacion", setConstatacionPDF);
router.get("/inspeccion", setInspeccionPDF);
router.get("/cpublica", setCpublicaPDF);
module.exports = router;
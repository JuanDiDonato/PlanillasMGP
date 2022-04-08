const PDFDocument = require('pdfkit'),fs = require("fs"), path = require("path"), date = new Date(),
inspeccionController = {};

inspeccionController.setInspeccionPDF = (req,res) => {
    const query = req.query,  doc = new PDFDocument();
    let filename = 'Inspeccion'+date.getMilliseconds()+'.pdf', text;
    doc.pipe(fs.createWriteStream(filename));

    text = `

Fecha:  ${query.a5}         Hora ${query.a6}      

Rubro:   ${query.a7}    

Domicilio:  ${query.a8}     

Firma:  ${query.a12}     

Atendido por:  ${query.a9} ,       DNI N° ${query.a10}

Al momento de la inspección, se verifica:   

        ${query.a11}

Previa lectura de este acta, se invita a firmar y recibir copia a quien atiende este procedimiento.
`    
    doc.font(path.join(__dirname.split("controllers")[0],"public","fonts","UnBatang_0613.ttf"));
    doc.image(path.join(__dirname.split("controllers")[0],"public","img","logo2.png"),200,35, {
        fit: [180, 180],
    });
    doc.fontSize(16).text(`ACTA DE INSPECCION N° ${query.a1}`,180,150);
    doc.fontSize(12).text(`${query.a2} N° ${query.a3}      Cuenta N° ${query.a4}`,205,180);
    doc.fontSize(12).text(text,65,200,{align:"justify"});
    doc.fontSize(10).text("FIRMA Y CARGO", 65, 550);
    doc.fontSize(10).text("SELLO", 280, 550);
    doc.fontSize(10).text("INSPECTOR", 470, 550);
    doc.end()
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename='+filename);
    doc.pipe(res);
} 

module.exports = inspeccionController;
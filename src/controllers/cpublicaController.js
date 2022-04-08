const PDFDocument = require('pdfkit'),fs = require("fs"), path = require("path"), date = new Date(),
cpublicaController = {};

cpublicaController.setCpublicaPDF = (req,res) => {
    const query = req.query,  doc = new PDFDocument();
    let filename = 'ConstatacionPublica'+date.getMilliseconds()+'.pdf', text, text2, text3, text4;
    doc.pipe(fs.createWriteStream(filename));

    text = `
Mar del Plata ${query.b2}/${query.b3}/${query.b4}

Naturaleza del hecho: ${query.b5}

Constituye Infracción a ${query.b6}

Lugar: ${query.b7}  Hora: ${query.b8}

Imputado: ${query.b9}   DNI: ${query.b10}

Domicilio: ${query.b11}

Vehículo: ${query.b12}  Patente: ${query.b13}

A los fines previstos en el art. 46 de la Ley 8751, se cita y emplaza al imputado a comparecer ante el Juzgado de Faltas, a la audiencia del dia ${query.b14} de ${query.b15} de ${query.b16} a las 9.00 hs o el  día hábil siguiente si aquel fuera sábado,domingo o feriado,bajo apercibimiento de considerar su incomparecencia injustificada como circunstancia agravante y decretar la clausura del establecimiento, su conducción por la fuerza pública y/o secuestro de los elementos utilizados para la comisión de la falta. Justicia Municipal de Faltas.
`

text2 = `
De acuerdo a lo previsto en el art. 43 deñ Dec. Ley 8751, art. 25 de la Ord. 5355 y en relacion al Acta de Constatación que antecede, se procede al secuestro de:
    
    ${query.b17}

Los elementos detallados se encuentroan depositados en ${query.b18}
`
text3 = `
TRIBUNAL MUNICIPAL DE FALTAS
Presentarse en: Juzgado de Turno
Garay 3136 - Mar del Plata - Batan
Horario de atención al público de 8.15hs a 14.30hs

Articulo 46° Ley 8751:"Dentro de las cuarenta y ocho horas de recibidas las actuaciones o labradas las denuncias, se citará al imputado" para que comparezca ante el Juez de Faltas en la audiencia que señalará, al efecto de que formule su defensa y ofrezca y produzca en la misma audiencia la prueba que intente valerse, bajo apercibimiento de hacerlo conducir por la fuerza pública y que se considere su incomparecencia como circunstancia agravante. En la notificación se transcribirá este artículo. La audiencia se fijará para una fecha comprendida entre los cinco (5) y diez (10) dias de la resolucion que la ordenara y se notificará al imputado con una antelación mínima de tres (3) días."

CONTINUACIÓN DE ACTA DE CONSTATACIÓN Y/U OBSERVACIONES

OBSERVACIONES:

    ${query.b19}

`
text4 = `
Imprescindible presentarse con la siguiente documentacion:

    1. La presente cédula.
    2. Documento de Identidad.
    3. Certificado de Habilitacion o permiso correspondiente.
    4. Libro de Inspecciones.
    5. En caso de sociedades, documentación que acredite ser el representante legal.
`

    doc.font(path.join(__dirname.split("controllers")[0],"public","fonts","UnBatang_0613.ttf"));
    doc.image(path.join(__dirname.split("controllers")[0],"public","img","logo.png"),380,50, {
        fit: [180, 180],
    });
    doc.fontSize(16).text(`ACTA DE CONSTATACION N° ${query.b1}`,65,80);
    doc.fontSize(12).text(text,65,180,{align:"justify"});
    doc.fontSize(10).text("Firma del imputado", 85, 650);
    doc.fontSize(10).text("Firma y sello del inspector", 400, 650);
    doc.fontSize(16).text(`ACTA DE SECUESTRO`,220,750);
    doc.fontSize(12).text(text2,65,100,{align:"justify"});
    doc.fontSize(10).text("Firma del imputado", 85, 350);
    doc.fontSize(10).text("Firma y sello del inspector", 400, 350);
    doc.fontSize(12).text(text3,65,500,{align:"justify"});
    doc.fontSize(10).text("Firma del imputado", 85, 450);
    doc.fontSize(10).text("Firma y sello del inspector actuante", 400, 450);
    doc.fontSize(12).text(text4,65,550,{align:"justify"});
    doc.end()
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename='+filename);
    doc.pipe(res);
}

module.exports=cpublicaController;

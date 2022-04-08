const PDFDocument = require('pdfkit'),fs = require("fs"), path = require("path");
const date = new Date();
const clausuraController = {};

clausuraController.setClausuraPdf = (req,res) => {
    const query = req.query;
    const doc = new PDFDocument;
    let filename = 'Clausura'+date.getMilliseconds()+'.pdf';
    doc.pipe(fs.createWriteStream(filename));

    let text = `
        En la ciudad de Mar del Plata, a los ${query.c1} dias del mes de ${query.c2} de ${query.c3} siendo las ${query.c4}hs, me constituyo en ${query.c5} Y en relacion con el acta de constatacion N° ${query.c6}, a la cual se agrega la presente, se procede deacuerdo al art. 19° inc ${query.c7} "A" ${query.c8} de la Ord. N°5355.

        Se deja constancia:

        1°) Que ${query.c9} han sido colocadas fajas selladas en ${query.c10}.

        2°) Que se hizo saber verbalmente al imputado, la falta en que incurría en 
                caso de que la medidad de clausura fuera violada.

        3°) Que ${query.c11} intervino funcionario policial, Leg. N° ${query.c12}.

        4°) Que la vigilancia que se establece en el local es la siguiente:
            ${query.c13}.

        Asimismo se deja constancia: 
            ${query.c14}.

        No siendo para más, se firman tres actas de un mismo tenor y a un solo efecto en la fecha señalada "Ut Supra",quedando el duplicado en poder del firmante.`
        
        doc.image(path.join(__dirname.split("controllers")[0],"public","img","logo5.png"),40,35, {
            fit: [280, 280],
        });
        doc.font(path.join(__dirname.split("controllers")[0],"public","fonts","UnBatang_0613.ttf"));
        doc.fontSize(16).text("ACTA DE CLAUSURA TRANSITORIA",180, 155);
        doc.fontSize(12).text(text,65, 200,{align:"justify"});
        doc.fontSize(12).text("Firma del imputado",100,560);
        doc.fontSize(12).text("Aclaracion de la firma",400,560);
        doc.fontSize(12).text("DNI-LE-LC-CPF- N°",100,660)
        doc.fontSize(12).text("Firma del Inspector Actuante - Leg.",300,700)
        doc.end();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename='+filename);
        doc.pipe(res);
}

module.exports=clausuraController;
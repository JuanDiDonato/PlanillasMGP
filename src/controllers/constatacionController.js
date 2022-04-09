const PDFDocument = require('pdfkit'),fs = require("fs"), path = require("path"), date = new Date(),
constatacionController = {};

constatacionController.setConstatacionPDF = async (req,res) => {
    const query = req.query, doc = new PDFDocument();
    let filename = 'Constatacion'+date.getMilliseconds()+'.pdf', text, text2, text3;
    doc.pipe(fs.createWriteStream(path.join(__dirname.split("controllers")[0],"pdfs",filename)))

    text = `
Localidad:  ${query.c2}     Fecha:  ${query.c3}     Hora:  ${query.c4} 
Lugar del hecho:  ${query.c5}    N° ${query.c6}      Local: ${query.c7}
Imputado:   ${query.c8}   DNI N° ${query.c9}
Domicilio Particular:   ${query.c10}      Responsable:  ${query.c11} 
DNI N° ${query.c12}     En calidad de:  ${query.c13} 
Nombre de fantasia del comercio:    ${query.c14}   Rubro:   ${query.c15}
Establecimiento de tipo COMERCIAL/INDUSTRIAL - Habilitación:    ${query.c16} 
Expte. N°   ${query.c17}.     N° de Cuenta:    ${query.c18}   Certificado de Salud(Dec. N°514/91) ${query.c20} - 
N° de elementos contra incendios:   ${query.c21}      Actualizados  ${query.c22}. 

El local cumple con las condiciones de habilitación según los planos que exhibe ${query.c23}(Art. 35 Ord. 5355) 

REUNE CONDICIONES DE SEGURIDAD  ${query.c24}.
REUNE CONDICIONES DE HIGIENE  ${query.c25}
REUNE CONDICIONES DE SALUBRIDAD  ${query.c26}

CONCURRE POR DENUNCIA  ${query.c27} - N° ${query.c28} 
Apellido y Nombre: ${query.c29}  Domicilio: ${query.c30}  DNI N° ${query.c31}

Ord. 5355 Art 10°. En los casos de denuncias el inspector debera constatar el hecho u omision punible y consignar este asi como el nombre
y el domicilio del denunciante en el acta de constatacion sin perjuicio de cumplimentar las otras formalidades exigidas por el articulo 2°.
ASIMISMO SE CONSTATA (Naturaleza y circunstancias del hecho u omisión y caracteristicas de los elementos empleados para se omision del hecho u omision punible).

${query.c32}

Disposicion legal presuntamente infringida ${query.c33}
Conforme a las previsiones contenidas en el art. 17 de la ordenanza 5355 se deja en expresa constancia que se han adopado las siguientes medidas preventivas, segun el resultado del acta agregada a la presente. No siendo para mas se firman tres actas de un mismo tenor y a un solo efecto en la fecha señalada "Ut supra", quedando el duplicado en poder del firmante.


A los fines previstos en el art. 46 del Decreto Ley 8751, se cita y emplaza al imputado a comparecer ante el JUZGADO MUNICIPAL DE FALTAS la audiencia del dia ${query.c34 } de ${query.c35} de ${query.c36} a las 8:15 horas, o el dia habil siguiente si aquel fuera feriado, bajo apercibimiento de considerar su incomparecencia injustificada como circunstancia agravante y decretar la clausura del establecimiento, su conduccion por la fuerza publica y/o secuestro de los elementos utilizados para la comision de la falta, Notifíquese. Justicia Municipal de faltas Art. 46 Decreto ley 8751: "Dentro de las cuarenta y ocho horas de recibidas las actuaciones o labradas las denuncias, se citará al imputado" para que comparezca ante el Juez de Faltas en la audiencia que señalará, al efecto de que formule su defensa y ofrezca y produzca en la misma audiencia la prueba que intente valerse, bajo apercibimiento de hacerlo conducir por la fuerza pública y que se considere su incomparecencia como circunstancia agravante. En la notificación se transcribirá este artículo. La audiencia se fijará para una fecha comprendida entre los cinco (5) y diez (10) dias de la resolucion que la ordenara y se notificará al imputado con una antelación mínima de tres(3) días."

`
text2 = `

Testigos:

Nombre y Apellido: ${query.c37}
DNI N° ${query.c38} Domicilio ${query.c39}

Nombre y Apellido: ${query.c40}
DNI N° ${query.c41} Domicilio ${query.c42}

No se detallan testigos por:  
No haberlos 
Negarse los mismos a portar datos


TRIBUNAL MUNICIPAL DE FALTAS
Presentarse en: Juzgado de Turno
Garay 3136 - Mar del Plata - Batan
Horario de atención al público de 8.15hs a 14.30h

CONTINUACIÓN DE ACTA DE CONSTATACIÓN Y/U OBSERVACIONES

OBSERVACIONES: ${query.c45}

`
text3 = `
Imprescindible presentarse con la siguiente documentacion:

    1. La presente cédula
    2. Certificado de Habilitación o permiso correspondiente
    3. Libro de inspecciones 
    4. En caso de sociedades, documentación que acredite ser el representante legal 
`


    doc.image(path.join(__dirname.split("controllers")[0],"public","img","logo.png"),380,35, {
        fit: [200, 200],
    });
    doc.fontSize(16).text(`Acta de Constatacion N° ${query.c1}`,65,70)
    doc.font(path.join(__dirname.split("controllers")[0],"public","fonts","UnBatang_0613.ttf"));
    doc.fontSize(12).text(text,65, 150,{align:"justify"});
    doc.fontSize(10).text("Firma del Imputado y/o persona presente en este acto",65, 440);
    doc.fontSize(10).text("Firma y sello del Inspector actualmente",370,440)
    doc.fontSize(12).text(text2,65, 500,{align:"justify"});
    doc.fontSize(10).text("Firma del imputado", 65, 300);
    doc.fontSize(10).text("Firma y sello del Inspector actualmente", 320,300);
    doc.fontSize(12).text(text3,65, 400,{align:"justify"});
    doc.end();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename='+filename);
    await doc.pipe(res);

    // borra el archivo una vez creado
    fs.unlink(path.join(__dirname.split("controllers")[0],"pdfs",filename), (err) => {
        if(err) throw err
        console.log(filename + " borrado con exito");
    })
}

module.exports = constatacionController;
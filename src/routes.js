var express = require("express");

const routes = new express.Router();

/* Objeto Messages

export interface Message {
  key?: Buffer | string | null
  value: Buffer | string | null
  partition?: number
  headers?: IHeaders
  timestamp?: string
}

*/
/*
 PROCESSAR PARA ENVIO

 const buf = Buffer.from([0x1, 0x2, 0x3]);

// Encode the Buffer to Base64
const base64Data = buf.toString('base64');

// Create a JSON object with the Base64-encoded data
const json = { data: base64Data };

// Convert the JSON object to a string
const jsonString = JSON.stringify(json);

console.log(jsonString);
//output {"data":"AQID"}

PROCESSAR PARA RECEBER O DADO

*/

routes.post("/certifications", async (req, res) => {
  //chama micro serviço certification

  console.log(req.producer);

  var obj = {
    user: { id: 1, name: "john bueno" },
    course: "Kafka/nodejs microServices step by step",
    grade: 5,
  }

  //ou value: { JSON.stringify(obj) }, funcionando 
 
  var bufObj = new Buffer.from(obj.toString()); //testar com esse

  await req.producer.send({
    topic: "issue-certificate",
    messages: [
      {
        //value: 'Hello KafkaJS user!'
        //Não aceita OBJETO precisar converter de JSON para Buffer
        /*
         var obj = {
          user: { id: 1, name: "john bueno" },
          course: "Kafka/nodejs microServices step by step",
          grade: 5,
         }

         var buf = new Buffer.from(obj.toString());
        */
        value: {
          bufObj // ou converte para ToString() direto
        },
      },
    ],
  });

  return res.json({ ok: true });
});

//export default routes;
module.exports = routes;

//59:12 parei
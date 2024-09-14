//import express from 'express';
var express = require("express");
const { Kafka } = require('kafkajs');
const routes = require("./routes");

const app = express();

const kafka = new Kafka({
  clientId: 'principal',
  //brokers: ['kafka1:9092', 'kafka2:9092'],
  brokers: ['localhost:9092'], //localhost para encontrar a porta
});

const producer = kafka.producer(
  // { //manter isso comentado ainda
  // allowAutoTopicCreation: false,
  // transactionTimeout: 30000
  // }
);

//Disponibilizar producer para todas as rotas
app.use((req, res, next) => {
  req.producer = producer;

  return next();
});

//Rotas cadastradas na aplicação
app.use(routes);

async function run() {
  //await producer.connect();

  app.listen(3333);
  console.log(`port: 3333`);
}

run().catch(console.error);


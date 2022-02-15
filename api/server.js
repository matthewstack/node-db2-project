const express = require("express");

const server = express();

// DO YOUR MAGIC
server.use(express.json());

const carsRouter = require("./cars/cars-router");

server.use("/api/cars", carsRouter);

module.exports = server;

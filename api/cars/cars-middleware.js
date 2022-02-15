const Cars = require("../cars/cars-model");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  const { id } = req.params;
  try {
    const existingCar = await Cars.getById(id);
    if (!existingCar) {
      next({ status: 404, message: `car with id ${id} is not found` });
    } else {
      req.car = existingCar;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC

  const { vin, make, model, mileage } = req.body;

  if (!vin) {
    next({ status: 400, message: "vin is missing" });
  } else if (!make) {
    next({ status: 400, message: "make is missing" });
  } else if (!model) {
    next({ status: 400, message: "model is missing" });
  } else if (!mileage) {
    next({ status: 400, message: "mileage is missing" });
  } else {
    req.vin = vin;
    req.make = make;
    req.model = model;
    req.mileage = mileage;

    next();
  }

  // if (trimmedName === undefined || budget === undefined) {
  //   next({ status: 400, message: "name and budget are required" });
  // } else if (typeof trimmedName !== "string") {
  //   next({ status: 400, message: "name of account must be a string" });
  // } else if (trimmedName.length < 3 || trimmedName.length > 100) {
  //   next({ status: 400, message: "name of account must be between 3 and 100" });
  // } else if (typeof budget !== "number") {
  //   next({ status: 400, message: "budget of account must be a number" });
  // } else if (budget < 0 || budget > 1000000) {
  //   next({
  //     status: 400,
  //     message: "budget of account is too large or too small",
  //   });
  // } else {
  //   req.name = name;
  //   req.budget = budget;
  //   next();
  // }
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = req.body;
  const isValidVin = vinValidator.validate(vin);
  if (!isValidVin) {
    next({ status: 400, message: `vin ${vin} is invalid` });
  } else {
    next();
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = req.body;
  try {
    const existingVin = await Cars.getAll().where("vin", vin).first();
    if (existingVin) {
      next({ status: 400, message: `vin ${vin} already exists` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};

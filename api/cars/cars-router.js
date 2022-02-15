// DO YOUR MAGIC
const router = require("express").Router();
const Cars = require("./cars-model");
const { checkCarId } = require("../cars/cars-middleware");

router.get("/", async (req, res, next) => {
  try {
    const allCars = await Cars.getAll();
    res.status(200).json(allCars);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkCarId, (req, res, next) => {
  res.json(req.car);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "something went wrong in the cars router",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;

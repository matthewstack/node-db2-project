// DO YOUR MAGIC
const router = require("express").Router();
const Cars = require("./cars-model");
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("../cars/cars-middleware");

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

router.post(
  "/",
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  (req, res, next) => {
    Cars.create(req.body)
      .then((car) => {
        res.json(car);
      })
      .catch((err) => {
        next(err);
      });
  }
);

router.put(
  "/:id",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  (req, res, next) => {
    Cars.updateById(req.params.id, req.body)
      .then((car) => {
        res.json(car);
      })
      .catch((err) => {
        next(err);
      });
  }
);

router.delete("/:id", checkCarId, (req, res, next) => {
  const { id } = req.params;
  Cars.deleteById(id)
    .then(() => {
      return res.json(req.car);
    })
    .catch((err) => {
      next(err);
    });
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: "something went wrong in the cars router",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;

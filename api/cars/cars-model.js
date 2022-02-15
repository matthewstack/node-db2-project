const db = require("../../data/db-config");

const getAll = () => {
  // DO YOUR MAGIC
  return db("cars");
};

const getById = (id) => {
  // DO YOUR MAGIC
  return db("cars").where({ id }).first();
};

const create = (car) => {
  // DO YOUR MAGIC
  return db("cars")
    .insert(car)
    .then((ids) => {
      return getById(ids[0]);
    });
};

const updateById = (id, car) => {
  // DO YOUR MAGIC
  return db("cars")
    .where({ id })
    .update(car)
    .then((rows) => {
      return getById(id);
    });
};

const deleteById = (id) => {
  return db("cars").where("id", id).del();
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
};

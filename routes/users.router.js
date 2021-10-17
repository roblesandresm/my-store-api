const express = require("express");
const router = express.Router();
const faker = require("faker");

router.get("/", (req, res) => {
  const users = [];
  let {limit, offset} = req.query;
  limit = limit || 10;
  offset = offset || 100;

  for (let index = 0; index < limit; index++) {
    users.push({
      username: faker.internet.userName(),
      name: faker.name.firstName() + " " + faker.name.lastName(),
      email: faker.internet.email(),
      avatar: faker.internet.avatar()
    });
  }

  res.status(200).json(users);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  if (id === "99") {
    res.status(404).json({
      mesagge: "Not Found"
    });
  } else {
    res.status(200).json({
      id,
      name: "Pepito Perez",
      userName: "pepito04"
    });
  }
});

router.post("/", (req, res) => {
  const body = req.body;

  res.status(201).json({
    mesagge: "create",
    data: body,
  });
});

module.exports = router;

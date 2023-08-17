const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({
    where: { username: username },
  });
  if (user) {
    return res.status(400).json({ message: "User name already exists" });
  }

  try {
    const hash = await bcrypt.hash(password, 10);
    const createdUser = await Users.create({
      username: username,
      password: hash,
    });

    const accessToken = sign(
      { username: createdUser.username, id: createdUser.id },
      "importantsecret"
      
    );

    return res.status(200).json({
      user: {
        username: createdUser.username,
        id: createdUser.id,
        accessToken: accessToken,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Error creating user." });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    return res.status(400).json({ message: "User Doesn't Exist" });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res
      .status(400)
      .json({ message: "Wrong Username And Password Combination" });
  }
  const accessToken = sign(
    { username: user.username, id: user.id },
    "importantsecret"
  );
  return res.status(200).json({
    username: user.username,
    id: user.id,
    accessToken: accessToken,
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;

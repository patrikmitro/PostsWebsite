const express = require("express");
const router = express.Router();
const { Posts } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll({ order: [["id", "DESC"]] });

  res.json(listOfPosts);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  const postId = await Posts.create(post);
  res.json({ id: postId.id });
});

router.delete("/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  await Posts.destroy({
    where: {
      id: id,
    },
  });
  res.status(200).json({
    message: "Success!",
  });
});

module.exports = router;

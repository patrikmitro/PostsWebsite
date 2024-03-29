const express = require("express");
const router = express.Router();
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
router.get("/:postId", async (req, res) => {
  const PostId = req.params.postId;
  const comments = await Comments.findAll({
    where: { PostId: PostId },
    order: [["id", "DESC"]],
  });
  res.json(comments);
});

router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  comment.userName = req.user.username;
  await Comments.create(comment);
  res.json(comment);
});

router.delete("/:postId", async (req, res) => {
  const { id } = req.headers;
  console.log(id);
  const postId = req.params.postId;

  await Comments.destroy({
    where: {
      id: id,
      postId: postId,
    },
  });

  return res.json();
});

module.exports = router;

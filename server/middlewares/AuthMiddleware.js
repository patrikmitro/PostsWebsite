const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) {
    return res.status(400).json({ message: "User not logged in" });
  }

  try {
    const validToken = verify(accessToken, "importantsecret");

    if (validToken) {
      req.user = validToken;

      next();
    }
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};

module.exports = { validateToken };

const User = require("../models/User");
const { verifyTokenAndAuthorisation } = require("./verifyToken");
const router = require("express").Router();

// get user;

router.get("/:id", verifyTokenAndAuthorisation, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    const { password, ...others } = user._doc;
    res.status(201).json(others);
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

module.exports = router;

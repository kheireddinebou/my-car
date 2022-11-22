const User = require("../models/User");
const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    // check if the user is exists
    const emailUser = await User.findOne({ email: req.body.email });
    if (emailUser) {
      res.status(401).json({ type: "email", message: "this email is exists!" });
      return;
    }

    // new user

    const newUser = new User({
      email: req.body.email,
      name: req.body.name,
      phone: req.body.phone,
      posts: [],
      password: CryptoJS.RC4.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString(),
    });

    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

router.post("/login", async (req, res) => {
  try {
    // check if the user is exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res
        .status(401)
        .json({ type: "email", message: "this email is not exists!" });
      return;
    }

    const originalPassword = CryptoJS.RC4.decrypt(
      user.password,
      process.env.PASS_SEC
    ).toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      res
        .status(401)
        .json({ type: "password", message: "incorrect password!" });
      return;
    }

    const { password, ...others } = user._doc;

    const accessToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    res.status(201).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

module.exports = router;

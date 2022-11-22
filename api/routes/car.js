const Car = require("../models/Car");
const User = require("../models/User");
const { verifyTokenAndAuthorisation } = require("./verifyToken");
const router = require("express").Router();
ObjectId = require("mongodb").ObjectId;

// create new post;

router.post("/:id", async (req, res) => {
  try {
    const newCar = new Car({ ...req.body, userId: req.params.id });
    const savedCar = await newCar.save();
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { posts: savedCar } },
      {
        new: true,
      }
    );
    res.status(201).json(savedCar);
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

// edit post;

router.put("/:id", verifyTokenAndAuthorisation, async (req, res) => {
  try {
    const { postId, ...others } = req.body;
    const updatedCar = await Car.findByIdAndUpdate(req.body.postId, others, {
      new: true,
    });

    await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { posts: { _id: ObjectId(postId) } } },
      {
        new: true,
      }
    );

    await User.findByIdAndUpdate(
      req.params.id,
      { $push: { posts: updatedCar } },
      {
        new: true,
      }
    );

    res.status(200).json(updatedCar);
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

// delete post

router.delete("/:id", verifyTokenAndAuthorisation, async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.body.id);
    await User.findByIdAndUpdate(
      req.params.id,
      { $pull: { posts: { _id: ObjectId(req.body.id) } } },
      {
        new: true,
      }
    );
    res.status(200).json("deleted successfully");
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

// get post

router.get("/:id", async (req, res) => {
  try {
    post = await Car.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

// get all posts

router.get("/", async (req, res) => {
  const qnew = req.query.new;
  const qmake = req.query.make;
  const qsearch = req.query.search;
  const qbudget = req.query.budget;
  const qbodyType = req.query.bodyType;

  try {
    let posts;

    if (qnew === "true") {
      // get latest posts
      posts = await Car.find({}).sort({ _id: -1 }).limit(12);
    } else if (qmake) {
      // get cars with the make name
      posts = await Car.find({ make: qmake });
    } else if (qsearch) {
      // get cars with seach query
      posts = await Car.find({ $text: { $search: qsearch } });
    } else if (qbudget) {
      // get cars with budget
      posts = await Car.find({ price: { $lte: qbudget } });
    } else if (qbodyType) {
      // get cars with body type
      posts = await Car.find({ type: qbodyType });
    } else {
      // get all posts
      posts = await Car.find();
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

module.exports = router;

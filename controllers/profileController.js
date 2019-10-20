const User = require("../models/User");
const Profile = require("../models/Profile");

const profileByHandleController = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);

    if (
      user.connectedPeople
        .map(item => item.user.toString())
        .indexOf(req.user._id) !== -1
    ) {
      const profile = await Profile.findOne({
        handle: req.params.handle
      }).populate("user", ["name", "avatar"]);

      if (!profile) {
        return res
          .status(404)
          .json({ noProfile: "There is no profile for this handle" });
      }

      res.json(profile);
    } else {
      return res
        .status(404)
        .json({ noProfile: "There is no profile for this handle" });
    }
  } catch (err) {
    return res
      .status(404)
      .json({ noProfile: "There is no profile for this handle" });
  }
};

const profileByUserIdController = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);

    if (
      user.connectedPeople
        .map(item => item.user.toString())
        .indexOf(req.user._id) !== -1
    ) {
      const profile = await Profile.findOne({
        user: req.params.user_id
      }).populate("user", ["name", "avatar"]);

      if (!profile) {
        return res
          .status(404)
          .json({ noProfile: "There is no profile for this user id" });
      }
      res.json(profile);
    } else {
      return res
        .status(404)
        .json({ noProfile: "There is no profile for this user id" });
    }
  } catch (err) {
    return res
      .status(404)
      .json({ noProfile: "There is no profile for this user id" });
  }
};

const profileCurrentGetController = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res
        .status(404)
        .json({ noProfile: "There is no profile for the current user" });
    }

    res.json(profile);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

const profileGetAllController = async (req, res) => {
  try {
    const profiles = await Profile.find({ identity: "doctor" }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profiles) {
      return res
        .status(404)
        .json({ noProfile: "There is no profile for the current user" });
    }

    res.json(profiles);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

const profileCurrentPostController = async (req, res) => {
  try {
    if (req.body.issues)
      req.body.issues = req.body.issues.split(",").map(item => item.trim());

    let profile = await Profile.findOne({ user: req.user._id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user._id },
        { $set: req.body },
        { new: true }
      );

      return res.json(profile);
    }

    const { handle } = req.body;

    profile = await Profile.findOne({ handle });

    if (profile) {
      console.log(req.body, profile);

      return res.status(400).json({ error: "Handle taken" });
    }

    req.body.user = req.user._id;

    profile = await new Profile(req.body).save();

    res.json(profile);
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

module.exports = {
  profileByHandleController,
  profileByUserIdController,
  profileCurrentGetController,
  profileCurrentPostController,
  profileGetAllController
};

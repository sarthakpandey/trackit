const User = require("../models/User");

const currentUserController = (req, res) => {
  return res.json(req.user);
};

const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users, count: users.length });
  } catch (err) {
    res.json({ err });
  }
};

const getConnectedPeopleController = async (req, res) => {
  try {
    console.log("hello1");
    const user = await User.findById(req.user._id);
    console.log("hello2");
    res.status(200).json(user.connectedPeople);
    console.log("hello3");
  } catch (err) {
    res.json({ err: err });
  }
};

const addController = async (req, res) => {
  try {
    const acceptor_id = req.user._id;

    const sender_id = req.params.id;

    console.log(acceptor_id, sender_id);

    if (acceptor_id.toString() === sender_id.toString()) {
      return res.json({ invalid: "Invalid action" });
    }

    const acceptor = await User.findById(acceptor_id);

    const sender = await User.findById(sender_id);

    acceptor.connectedPeople.unshift({
      user: sender_id,
      name: sender.name,
      avatar: sender.avatar
    });

    sender.connectedPeople.unshift({
      user: acceptor_id,
      name: acceptor.name,
      avatar: acceptor.avatar
    });

    await acceptor.save();
    await sender.save();

    res.json(acceptor.connectedPeople);
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
};

const checkAddedController = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(req.user._id);

    const idxConnected = user.connectedPeople
      .map(item => item.user.toString())
      .indexOf(id.toString());

    return res.json({
      connected: idxConnected !== -1
    });
  } catch (err) {
    res.json({ err });
  }
};

module.exports = {
  currentUserController,
  getConnectedPeopleController,
  addController,
  checkAddedController,
  getAllUsersController
};

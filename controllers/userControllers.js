const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    console.log('init get all users')
    User.find()
      .then(async (users) => {
        const userObj = {
          users,
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single user
  getSingleUser(req, res) {
    console.log('init get user by id')
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts')
      .populate('friends')
      .then(async (user) =>
        !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json({
                user,
            })
      )
      .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
      });
  },
  // create a new user
  createUser(req, res) {
    console.log('init create user')
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Delete a user and rremove thoughts associated with them
  deleteUser(req, res) {
    console.log('init delete user')
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
            ? res.status(404).json({ message: 'No such user exists' })
            : Thought.deleteMany({ _id: { $in: user.thoughts } })

        //   : Thought.deleteMany({ _id: { $in: user.thoughts } })
            // : res.json(user)
      )
      .then(() => res.json({ message: 'User and thoughts deleted!' }))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Update a user
  updateUser(req, res) {
    console.log('init update user')
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },




  // Add a friend to a student
  addFriend(req, res) {
    console.log('You are adding a friend');
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove friend from a student
  removeFriend(req, res) {
    console.log('You are removing a friend');
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends:  req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};

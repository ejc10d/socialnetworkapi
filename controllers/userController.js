const { User, Thought } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
        .populate({
            path: 'friends',
            select: '-__v',
        })
        .select('-__v')
        .sort({_id: -1})
        .then((user) => res.json(user))
        .catch((err) => {console.log(err);
        res.sendStatus(400);
    });
    },

    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .lean()
        .then(async (user) => 
        !user
        ? res.status(404).json({
            message: 'No user with that ID'
        })
        : res.json({
            user
        })
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate ({})
    },

    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'No user with that ID. '})
        : Thought.deleteMany({ _id: { $in: user.thoughts } }))
        .then(() => {
            res.json({ message: 'User and user thoughts deleted.'});
        })
        .catch((err) => res.status(500).json(err));
    },

    addFriend(req, res) {
        console.log('You are adding a friend.');
        console.log(req.body);
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
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

    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friend: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
        )
        .then((user) => 
        !user
        ? res
        .status(404)
        .json({ message: 'No user found with that ID :(' })
        :  res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
};

module.exports = userController;
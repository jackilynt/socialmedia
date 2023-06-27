// const router = require('express').Router();
// const {Users,Thoughts,Reactions} = require('../../models');



// // GET api/users/
// // Get all users
// router.get("/", async(req,res)=>{
  
//   await Users.find({})
//   //   .then((data) =>{
//   //     console.log(data)
//   // })
//   //   .catch((err) =>{ console.log(err) });
//     .then((data) =>
//       !data
//         ? res.status(404).json({ message: 'Not found with the id!' })
//         : res.json(data)
//     )
//     .catch((err) => console.log({err:err}));

// })

// module.exports = router;

// const router = require('express').Router();
// const { Users } = require('../../models');

// // GET /api/users
// // Get all users
// router.get('/', async (req, res) => {
//   await Users.find({})
//     .then((users) =>
//       !users
//         ? res.status(404).json({ message: 'No users found' })
//         : res.json(users)
//     )
//     .catch((err) => res.status(500).json(err));
// });

// // GET /api/users/:userId
// // Get a single user by ID
// router.get('/:userId', async (req, res) => {
//   await Users.findOne({ _id: req.params.userId })
//     .then((user) =>
//       !user
//         ? res.status(404).json({ message: 'No user with that ID' })
//         : res.json(user)
//     )
//     .catch((err) => res.status(500).json(err));
// });

// const { Types } = require('mongoose');

// // POST /api/users
// // Create a new user
// router.post('/', async (req, res) => {
//   const { username, email } = req.body;

//   // Create a new user document
//   const user = new Users({
//     username,
//     email,
//   });

//   // Save the user to the database
//   await user
//     .save()
//     .then((savedUser) => res.json(savedUser))
//     .catch((err) => res.status(500).json(err));
// });

// // PUT /api/users/:userId
// // Update a user by ID
// router.put('/:userId', async (req, res) => {
//   const { userId } = req.params;
//   const { username, email } = req.body;

//   if (!Types.ObjectId.isValid(userId)) {
//     return res.status(400).json({ message: 'Invalid user ID' });
//   }

//   // Find the user by ID and update the fields
//   await Users.findByIdAndUpdate(
//     userId,
//     { username, email },
//     { new: true, runValidators: true }
//   )
//     .then((updatedUser) =>
//       !updatedUser
//         ? res.status(404).json({ message: 'No user with that ID' })
//         : res.json(updatedUser)
//     )
//     .catch((err) => res.status(500).json(err));
// });

// // DELETE /api/users/:userId
// // Delete a user by ID
// router.delete('/:userId', async (req, res) => {
//   const { userId } = req.params;

//   if (!Types.ObjectId.isValid(userId)) {
//     return res.status(400).json({ message: 'Invalid user ID' });
//   }

//   // Find the user by ID and remove it
//   await Users.findByIdAndRemove(userId)
//     .then((deletedUser) =>
//       !deletedUser
//         ? res.status(404).json({ message: 'No user with that ID' })
//         : res.json({ message: 'User successfully deleted' })
//     )
//     .catch((err) => res.status(500).json(err));
// });

// module.exports = router;

const router = require('express').Router();
const { Users } = require('../../models');

// GET /api/users
// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /api/users/:userId
// Get a single user by ID
router.get('/:userId', async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/users
// Create a new user
router.post('/', async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT /api/users/:userId
// Update a user by ID
router.put('/:userId', async (req, res) => {
  try {
    const user = await Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user with this ID' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE /api/users/:userId
// Delete a user by ID
router.delete('/:userId', async (req, res) => {
  try {
    const user = await Users.findOneAndRemove({ _id: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: 'No user with this ID' });
    }
    // Remove the user's thoughts
    await Thoughts.deleteMany({ _id: { $in: user.thoughts } });
    res.json({ message: 'User and associated thoughts successfully deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/users/:userId/friends/:friendId
// Add a friend to a user
router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user with this ID' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE /api/users/:userId/friends/:friendId
// Remove a friend from a user
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await Users.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user with this ID' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
// const { Thoughts } = require('../../models');

// const router = require('express').Router();

// router.get("/", async(req,res)=>{
  
//   await Thoughts.find({})
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
// const { Thoughts } = require('../../models');

// // GET /api/thoughts
// // Get all thoughts
// router.get('/', async (req, res) => {
//   await Thoughts.find({})
//     .then((thoughts) =>
//       !thoughts
//         ? res.status(404).json({ message: 'No thoughts found' })
//         : res.json(thoughts)
//     )
//     .catch((err) => res.status(500).json(err));
// });

// // GET /api/thoughts/:thoughtId
// // Get a single thought by ID
// router.get('/:thoughtId', async (req, res) => {
//   await Thoughts.findOne({ _id: req.params.thoughtId })
//     .then((thought) =>
//       !thought
//         ? res.status(404).json({ message: 'No thought with that ID' })
//         : res.json(thought)
//     )
//     .catch((err) => res.status(500).json(err));
// });

// const { Types } = require('mongoose');

// // POST /api/thoughts
// // Create a new thought
// router.post('/', async (req, res) => {
//   const { userId, thoughtText } = req.body;

//   // Create a new thought document
//   const thought = new Thoughts({
//     userId,
//     thoughtText,
//   });

//   // Save the thought to the database
//   await thought
//     .save()
//     .then((savedThought) => res.json(savedThought))
//     .catch((err) => res.status(500).json(err));
// });

// // PUT /api/thoughts/:thoughtId
// // Update a thought by ID
// router.put('/:thoughtId', async (req, res) => {
//   const { thoughtId } = req.params;
//   const { thoughtText } = req.body;

//   if (!Types.ObjectId.isValid(thoughtId)) {
//     return res.status(400).json({ message: 'Invalid thought ID' });
//   }

//   // Find the thought by ID and update the thoughtText field
//   await Thoughts.findByIdAndUpdate(
//     thoughtId,
//     { thoughtText },
//     { new: true, runValidators: true }
//   )
//     .then((updatedThought) =>
//       !updatedThought
//         ? res.status(404).json({ message: 'No thought with that ID' })
//         : res.json(updatedThought)
//     )
//     .catch((err) => res.status(500).json(err));
// });

// // DELETE /api/thoughts/:thoughtId
// // Delete a thought by ID
// router.delete('/:thoughtId', async (req, res) => {
//   const { thoughtId } = req.params;

//   if (!Types.ObjectId.isValid(thoughtId)) {
//     return res.status(400).json({ message: 'Invalid thought ID' });
//   }

//   // Find the thought by ID and remove it
//   await Thoughts.findByIdAndRemove(thoughtId)
//     .then((deletedThought) =>
//       !deletedThought
//         ? res.status(404).json({ message: 'No thought with that ID' })
//         : res.json({ message: 'Thought successfully deleted' })
//     )
//     .catch((err) => res.status(500).json(err));
// });

// // POST /api/thoughts/:thoughtId/reactions
// // Add a reaction to a thought
// router.post('/:thoughtId/reactions', async (req, res) => {
//   const { thoughtId } = req.params;
//   const { reactionBody, username } = req.body;

//   if (!Types.ObjectId.isValid(thoughtId)) {
//     return res.status(400).json({ message: 'Invalid thought ID' });
//   }

//   // Find the thought by ID and add the reaction
//   await Thoughts.findByIdAndUpdate(
//     thoughtId,
//     { $push: { reactions: { reactionBody, username } } },
//     { new: true, runValidators: true }
//   )
//     .then((updatedThought) =>
//       !updatedThought
//         ? res.status(404).json({ message: 'No thought with that ID' })
//         : res.json(updatedThought)
//     )
//     .catch((err) => res.status(500).json(err));
// });

// // DELETE /api/thoughts/:thoughtId/reactions/:reactionId
// // Remove a reaction from a thought
// router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
//   const { thoughtId, reactionId } = req.params;

//   if (!Types.ObjectId.isValid(thoughtId) || !Types.ObjectId.isValid(reactionId)) {
//     return res.status(400).json({ message: 'Invalid thought or reaction ID' });
//   }

//   // Find the thought by ID and remove the reaction
//   await Thoughts.findByIdAndUpdate(
//     thoughtId,
//     { $pull: { reactions: { _id: reactionId } } },
//     { new: true, runValidators: true }
//   )
//     .then((updatedThought) =>
//       !updatedThought
//         ? res.status(404).json({ message: 'No thought with that ID' })
//         : res.json(updatedThought)
//     )
//     .catch((err) => res.status(500).json(err));
// });


// module.exports = router;


const router = require('express').Router();
const { Thoughts } = require('../../models');

// GET /api/thoughts
// Get all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thoughts.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /api/thoughts/:thoughtId
// Get a single thought by ID
router.get('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thoughts.findOne({ _id: req.params.thoughtId });
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/thoughts
// Create a new thought
router.post('/', async (req, res) => {
  try {
    const thought = await Thoughts.create(req.body);
    const user = await Users.findOneAndUpdate(
      { _id: req.body.userId },
      { $addToSet: { thoughts: thought._id } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'Thought created, but no user with that ID' });
    }
    res.json('Created the thought 🎉');
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// PUT /api/thoughts/:thoughtId
// Update a thought by ID
router.put('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this ID' });
    }
    res.json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// DELETE /api/thoughts/:thoughtId
// Delete a thought by ID
router.delete('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thoughts.findOneAndRemove({ _id: req.params.thoughtId });
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this ID' });
    }
    const user = await Users.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'Thought deleted but no user with this ID' });
    }
    res.json({ message: 'Thought successfully deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/thoughts/:thoughtId/reactions
// Add a reaction to a thought
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const reaction = await Reactions.create(req.body);
    const thought = await Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: reaction._id } },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this ID' });
    }
    res.json('Added a reaction to the thought');
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE /api/thoughts/:thoughtId/reactions/:reactionId
// Remove a reaction from a thought
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const reaction = await Reactions.findOneAndRemove({ _id: req.params.reactionId });
    if (!reaction) {
      return res.status(404).json({ message: 'No reaction with this ID' });
    }
    const thought = await Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.params.reactionId } },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'Thought found, but no reaction with this ID' });
    }
    res.json({ message: 'Removed the reaction from the thought' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

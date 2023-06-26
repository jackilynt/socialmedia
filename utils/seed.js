// const connection = require('../config/connection');
// const { Reactions, Users, Thoughts } = require('../models');


// connection.on('error', (err) => err);

// connection.once('open', async () => {
//   console.log('connected');
//   await Users.deleteMany({});
//   await Thoughts.deleteMany({});

//   const newUser = await Users.create({
//     username: "test1",
//     email: "test1@test.com"

//   });

//   const newThought = await Thoughts.create({
//     username: "test1",
//     thoughtText: "This is a test thought"

//   });

//   //console.log({nuid:newUser._id.toString(), ntid: newThought._id.toString()})
//   //const test = await Users.findOne({_id: newUser._id.toString()})
//   //console.log({test})

//     await Users.findOneAndUpdate(
//       { _id: newUser._id },
//       { $addToSet: { thoughts: newThought._id } },
//       { runValidators: true, new: true }
//     )
//       .then((data) =>{
//         console.log(data)
//     })
//       .catch((err) =>{ console.log(err) });
//       // .then((data) =>
//       //   !data
//       //     ? res.status(404).json({ message: 'Not found with the id!' })
//       //     : res.json(data)
//       // )
//       // .catch((err) => console.log({err:err}));


//   console.info('Seeding complete! 🌱');
//   process.exit(0);
// });



const connection = require('../config/connection');
const { Reactions, Users, Thoughts } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Users.deleteMany({});
  await Thoughts.deleteMany({});

  const newUser1 = await Users.create({
    username: "test1",
    email: "test1@test.com"
  });

  const newUser2 = await Users.create({
    username: "test2",
    email: "test2@test.com"
  });

  const newUser3 = await Users.create({
    username: "test3",
    email: "test3@test.com"
  });

  const newThought1 = await Thoughts.create({
    username: "test1",
    thoughtText: "This is a test thought from user 1"
  });

  const newThought2 = await Thoughts.create({
    username: "test2",
    thoughtText: "This is a test thought from user 2"
  });

  const newThought3 = await Thoughts.create({
    username: "test3",
    thoughtText: "This is a test thought from user 3"
  });

  await Users.findOneAndUpdate(
    { _id: newUser1._id },
    { $addToSet: { thoughts: newThought1._id } },
    { runValidators: true, new: true }
  );

  await Users.findOneAndUpdate(
    { _id: newUser2._id },
    { $addToSet: { thoughts: newThought2._id } },
    { runValidators: true, new: true }
  );

  await Users.findOneAndUpdate(
    { _id: newUser3._id },
    { $addToSet: { thoughts: newThought3._id } },
    { runValidators: true, new: true }
  );

  console.info('Seeding complete! 🌱');
  process.exit(0);
});

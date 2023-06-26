const router = require('express').Router();
const {Users,Thoughts,Reactions} = require('../../models');
// const {
//   getUsers,
//   getSingleUser,
//   createUser,
// } = require('../../controllers/userController');

// // /api/users
// router.route('/').get(getUsers).post(createUser);

// // /api/users/:userId
// router.route('/:userId').get(getSingleUser);

// GET api/users/
// Get all users
router.get("/", async(req,res)=>{
  
  await Users.find({})
  //   .then((data) =>{
  //     console.log(data)
  // })
  //   .catch((err) =>{ console.log(err) });
    .then((data) =>
      !data
        ? res.status(404).json({ message: 'Not found with the id!' })
        : res.json(data)
    )
    .catch((err) => console.log({err:err}));

})

module.exports = router;


const { Thoughts } = require('../../models');

const router = require('express').Router();

router.get("/", async(req,res)=>{
  
  await Thoughts.find({})
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


// npm test
const connection = require('./config/connection');
const { Reactions, Users, Thoughts } = require('./models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  //router.get("/", async(req,res)=>{
  
    const userData = await Users.find({})
    console.log(userData)
  
  //})

  console.info('Testing complete!');
  process.exit(0);
});

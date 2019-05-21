const express = require('express');
const router = express.Router();

//@route GET api/users/test
//@Description test post route
//@acess public

router.get('/test',(req,res)=>res.json({msg:'Users work'}));

module.exports = router;
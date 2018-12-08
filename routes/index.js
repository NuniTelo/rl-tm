var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/stream/:chunks',function(req,res,next){

/*This headers are very important if we want to have a open connection */
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');


   // set default chunks to 10
   var chunks = req.params.chunks || 10

   // max out chunks at 100

   var count = 1

   while (count <= chunks) {
     res.write(JSON.stringify({
       type: "stream",
       chunk: count++
     })+'\n')
   };

});



module.exports = router;

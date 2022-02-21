const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.status(200).json({
    message: "Welcome to Node js User API",
    node_version: process.versions?.node
  })
});

module.exports = router;

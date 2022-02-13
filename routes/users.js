var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.status(200).json({
    "users": [
      {
        "firstName": "John",
        "lastName": "Cena"
      },
      {
        "firstName": "จันทร์",
        "lastName": "เจ้าขา"
      }
    ]
  })
});

module.exports = router;

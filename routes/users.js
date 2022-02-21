const express = require('express');
const router = express.Router();
const createError = require('http-errors');

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
      },
      {
        "firstName": "สัญญา",
        "lastName": "สายันต์"
      }
    ]
  })
});
// Method not allowed
router.all('*', (req, res, next) => {  
  next(createError(405));
})

module.exports = router;

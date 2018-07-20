var express = require('express');
var router = express.Router();
var weatherController = require('../controllers/weather.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getcurrweather', weatherController.getCurrentWeatherForCity);
router.get('/getforecast', weatherController.getForecastForCity);
module.exports = router;

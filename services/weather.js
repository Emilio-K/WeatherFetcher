/*jshint node: true */
'use strict';
var request = require('request');
var dotenv=require('dotenv').config();
const URL= "https://api.openweathermap.org/data/2.5/weather?q=London&APPID="+process.env.API_KEY;

module.exports={
  getWeather: () => {
    request.get({
      url: URL,
      json: true,
      headers:{'User-Agent': 'request'}
    }, (err,res,data) => {
      if(err){
        console.log( err);
      }else if(res.statusCode!= 200){
        console.log('Status', res.statusCode);
      }else{
        console.log(data.weather);
      }
    });
  }
};
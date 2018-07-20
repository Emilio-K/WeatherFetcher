/*jshint node: true */
'use strict';
var request = require('request');
var dotenv=require('dotenv').config();

const apiKeyParam= "&APPID="+process.env.API_KEY;

module.exports={
  //get the current weather for a certain city.
  getCurrentWeatherForCity: (req,res,next) => {
    let city = req.query.city;
    console.log("city:" +city);
    let URL = process.env.BASE_URI + "weather?q=" + city + "&units=metric" + apiKeyParam;
    request.get({
      url: URL,
      json: true,
      headers:{'User-Agent': 'request'}
    }, (err,resp,data) => {
      if(err){
        return next(err);
      }else if(resp.statusCode!= 200){
        return next(resp);
      }else{
        res.render('result', {data:data});
      }
    });
  },

  getForecastForCity: (req,res,next) => {
    let city = req.query.city;
    let URL= process.env.BASE_URI + "forecast?q=" + city + "&units=metric" + apiKeyParam;
    request.get({
      url: URL,
      json:true,
      headers:{'User-Agent': 'request'},
    }, (err,resp,data) => {
      if(err){
        return next(err);
      }else if(resp.statusCode != 200){
        return next(resp);
      }else{
        res.render('result', {data:data});
      }
    });
  }
};
// index.js

/**
 * Required External Modules
 */

 //const express = require("express");
 //const path = require("path");
 //require('dotenv').config()
 //const bodyParser = require('body-parser')
  //const fetch = require('node-fetch');

 import express from 'express';
 import path from 'path';
 const __dirname = path.resolve();
 import dotenv from 'dotenv';
 dotenv.config();
 import bodyParser from 'body-parser';
 import fetch from 'node-fetch';

/**
 * App Variables
 */
 const app = express();
 const port = process.env.PORT || "8000";
 console.log(process.env.PORT);

/**
 *  App Configuration
 */
 app.set("views", path.join(__dirname, "views"));
 app.set("view engine", "ejs");
 app.use(express.static(path.join(__dirname, "public")));
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Routes Definitions
 */
 app.get("/", (req, res) => {
    res.render('index', {foo: 'FOO'});
    //res.status(200).send("Freight quotation: Get your quote now!");
  });

  app.post('/locations', (req, res, next) => {


    const fetchReq1 = fetch(`http://api.positionstack.com/v1/forward?access_key=d72e69a8463cf82bca1f032eb79c805f&query=${req.body.address1}`)
    .then(response => response.json())

    const fetchReq2 = fetch(`http://api.positionstack.com/v1/forward?access_key=d72e69a8463cf82bca1f032eb79c805f&query=${req.body.address2}`)
    .then(response => response.json())
    
    
    const coordData = Promise.all([fetchReq1, fetchReq2]);

    coordData.then((response) => {
      //console.log(response[0]['data'])
      // console.log(response[0]['data'][0]['latitude'])
      // console.log(response[0]['data'][0]['longitude'])
      // console.log(response[1]['data'][0]['latitude'])
      // console.log(response[1]['data'][0]['longitude'])

      let lat1 = response[0]['data'][0]['latitude'];
      let long1 = response[0]['data'][0]['longitude'];
      let lat2 = response[1]['data'][0]['latitude'];
      let long2 = response[1]['data'][0]['longitude'];

      const fetchReq3 = fetch(`https://api.lufthansa.com/v1/references/airports/nearest/${lat1},${long1}`, {
           headers: {
             'Authorization': 'Bearer y2t4uqmsugp3epq9q57mrspr',
             'Accept': 'application/json'
           }
           }).then(response => response.json())

      const fetchReq4 = fetch(`https://api.lufthansa.com/v1/references/airports/nearest/${lat2},${long2}`, {
            headers: {
              'Authorization': 'Bearer y2t4uqmsugp3epq9q57mrspr',
              'Accept': 'application/json'
            }
            }).then(response => response.json())

      const airportData = Promise.all([fetchReq3, fetchReq4]);
      airportData.then((response2) => {
        // console.log(response2)
        // console.log(response2[0]["NearestAirportResource"]["Airports"]["Airport"][0]["Names"]["Name"][0]["$"]);
        // console.log(response2[1]["NearestAirportResource"]["Airports"]["Airport"][0]["Distance"]);

        res.render('locations', { 
                airport1: JSON.stringify(response2[0]["NearestAirportResource"]["Airports"]["Airport"][0]["Names"]["Name"][0]["$"]),
                distance1:JSON.stringify(response2[0]["NearestAirportResource"]["Airports"]["Airport"][0]["Distance"]["Value"]),
                airport2: JSON.stringify(response2[1]["NearestAirportResource"]["Airports"]["Airport"][0]["Names"]["Name"][0]["$"]),
                distance2:JSON.stringify(response2[1]["NearestAirportResource"]["Airports"]["Airport"][0]["Distance"]["Value"])
             });

      })

    });



    // fetch(`http://api.positionstack.com/v1/forward?access_key=d72e69a8463cf82bca1f032eb79c805f&query=${req.body.address}`)
    // .then(response => response.json())
    // .then(data => {
    //   console.log(data["data"][0]);
    //   let lat = data["data"][0]["latitude"];
    //   let long = data["data"][0]["longitude"];
    //   console.log(lat);
    //   console.log(long);

    //   fetch(`https://api.lufthansa.com/v1/references/airports/nearest/${lat},${long}`, {
    //   headers: {
    //     'Authorization': 'Bearer y2t4uqmsugp3epq9q57mrspr',
    //     'Accept': 'application/json'
    //   }
    //   }).then(response => response.json())
    //   .then(data =>{ 
    //     console.log(data["NearestAirportResource"]["Airports"]["Airport"][0]["Names"]["Name"][0]["$"]);
    //     console.log(data["NearestAirportResource"]["Airports"]["Airport"][0]["Distance"]);
    //     res.render('locations', { 
    //      airport: JSON.stringify(data["NearestAirportResource"]["Airports"]["Airport"][0]["Names"]["Name"][0]["$"]),
    //      distance:JSON.stringify(data["NearestAirportResource"]["Airports"]["Airport"][0]["Distance"]["Value"])
        
    //   });

    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });
    // }).catch((error) => {
    //   console.error('Error:', error);
    // });;
    
    
 });

/**
 * Server Activation
 */

 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
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
 import {connectDB} from "./db.js"
 import colors from 'colors';
/**
 * App Variables
 */
 const app = express();
 const port = process.env.PORT || "8000";
 console.log(process.env.PORT);

 /**
 *  Connect to database
 */
  connectDB();

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
      

      let lat1 = response[0]['data'][0]['latitude'];
      let long1 = response[0]['data'][0]['longitude'];
      let lat2 = response[1]['data'][0]['latitude'];
      let long2 = response[1]['data'][0]['longitude'];
      let continent1 = response[0]['data'][0]['continent'];
      let continent2 = response[1]['data'][0]['continent'];
      //console.log(continent1);

      const fetchReq3 = fetch(`https://api.lufthansa.com/v1/references/airports/nearest/${lat1},${long1}`, {
           headers: {
             'Authorization': 'Bearer wdd4jx3k4f7b9k38ucb2henv',
             'Accept': 'application/json'
           }
           }).then(response => response.json())

      const fetchReq4 = fetch(`https://api.lufthansa.com/v1/references/airports/nearest/${lat2},${long2}`, {
            headers: {
              'Authorization': 'Bearer wdd4jx3k4f7b9k38ucb2henv',
              'Accept': 'application/json'
            }
            }).then(response => response.json())

      const airportData = Promise.all([fetchReq3, fetchReq4]);
      
      airportData.then((response2) => {

       //console.log(response2[0]) 
        
       let distance1 = response2[0]["NearestAirportResource"]["Airports"]["Airport"][0]["Distance"]["Value"];
       let distance2 = response2[1]["NearestAirportResource"]["Airports"]["Airport"][0]["Distance"]["Value"];

        let price1, price2;
        switch(continent1) {
          case 'Europe':
            // code block
            price1 = 11;
            break;
          case 'Asia':
            // code block
            price1 = 12;
            break;
          case 'Africa':
            // code block
            price1 = 13;
            break;
          default:
            price1 = 10;
        }
        switch(continent2) {
          case 'Europe':
            // code block
            price2 = 11;
            break;
          case 'Asia':
            // code block
            price2 = 12;
            break;
          case 'Africa':
            // code block
            price2 = 13;
            break;
          default:
            price2 = 10;
        }
        res.render('locations', { 
                airport1: JSON.stringify(response2[0]["NearestAirportResource"]["Airports"]["Airport"][0]["Names"]["Name"][0]["$"]),
                distance1:JSON.stringify(response2[0]["NearestAirportResource"]["Airports"]["Airport"][0]["Distance"]["Value"]),
                price1: price1 * distance1,
                airport2: JSON.stringify(response2[1]["NearestAirportResource"]["Airports"]["Airport"][0]["Names"]["Name"][0]["$"]),
                distance2:JSON.stringify(response2[1]["NearestAirportResource"]["Airports"]["Airport"][0]["Distance"]["Value"]),
                price2: price2 * distance2
             });

      })

    });

    
    
 });

/**
 * Server Activation
 */

 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
  });
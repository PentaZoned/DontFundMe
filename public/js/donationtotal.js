//Dependencies
const inquirer = require("inquirer")
const express = require('express');
const mysql = require('mysql2');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "funding_db"
  });


//Get an array of donation amounts
const donation_total = () => {
    
    const projectId = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1];
    var query = `SELECT * FROM donation WHERE project_id=${projectId}`;
    db.query(query,  (err, res) => {
      if (err) throw err
      for (var i = 0; i < res.length; i++) {
        donation_total += res[i].amount;
      }
  
    })
    return donation_total;
  }

  

document.querySelector('.donate-form-group').addEventListener('submit', donationFormHandler);
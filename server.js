// importing and requiring 
const express = require('express');
const mysql = require('mysql');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

const db = mysql.createConnection(
    // if localhost don't work use 127.0.0.1
    {
     host: 'localhost',

     user: 'root',

     password: '',
    //  add your password for my sql
     database: ''
    },
    console.log(`Connected to blank database`)
);



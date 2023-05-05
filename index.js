const express = require('express');
const app = express();
const mongoose = require('mongoose');
const customer = require('./modules/module');

app.get('/', (req,res) => {
    res.send('Hello World');
});

app.get('/customer',  async (req,res) => {
    const customers = await customer.find();
    res.send(customers);
});

require('dotenv').config();



const start = async() => {
    try{
        await mongoose.connect(process.env.connect);
        console.log('connected to db');
        app.listen(port,()=>console.log('connected to port '+port));
    }
    catch(err){
        console.log(err.message);
    }
};
start();
const port = process.env.port || 3000;

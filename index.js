const express = require('express');
const app = express();
const mongoose = require('mongoose');
const customer = require('./modules/module');

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req,res) => {
    res.send('Hello World');
});

app.get('/customer',  async (req,res) => {
    const customers = await customer.find();
    res.send(customers);
});

require('dotenv').config();

app.post('/customer', async(req,res) => {
    console.log(req.body);
    try{
        const customers = new customer(req.body);
        const result = await customers.save();
        res.json(result);
    }
    catch(err){
        res.status(500).json(err.message);
    }
})


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

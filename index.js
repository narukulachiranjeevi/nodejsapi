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
        res.status(201).send(customers);
    }
    catch(err){
        res.status(500).json(err.message);
    }
})

app.put('/customer/:id',async(req,res) => {
    const {id} = req.params;
    try{
        const result = await customer.replaceOne({_id:id},req.body);
        res.json(result.modifiedCount);
    }
    catch(e){
        res.status(500).json("Internal eroor" + e.message);
    }
});

app.get('/customer/:id', async(req,res) => {
    const {id} =req.params;
    try{
        const result = await customer.findById(id);
        if(!result){
            res.status(404).send('customer not found');
        }
        else{
            res.send(result);
        }
    }
    catch(e){
        res.status(500).json(e.message);
    }
});

app.delete('/customer/:id', async(req,res) => {
    const {id} = req.params;
    try{
        const result = await customer.deleteOne({_id:id});
        res.status(200).json(result.deletedCount);
    }
    catch(e){
        res.status(500).json("Error occured"+e.message);
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

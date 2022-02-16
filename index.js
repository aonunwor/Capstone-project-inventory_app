const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


app.get('/', (req, res)=>{
    res.status(200);
    res.send(`Welcome to my Inventory_app home page`)
    res.end();
})



const PORT = process.env.PORT || 3030;
app.listen(PORT, ()=>{
        console.log(`APP is listening on port ${PORT}!`);
        console.log(`press ctrl+c to quit`);
})
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res)=>{
    res.status(200);
    res.render(`pages/home`)
    res.end();
})

//To register
app.get('/register', (req,res)=>{
        res.status(200);
        res.render(`pages/register`);
        res.end();
})

const PORT = process.env.PORT || 3030;
app.listen(PORT, ()=>{
        console.log(`APP is listening on port ${PORT}!`);
        console.log(`press ctrl+c to quit`);
})
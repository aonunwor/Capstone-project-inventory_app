const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const { Console } = require('console');
const bodyParser = require('body-parser');
const User = require(`./models/user`);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));

main().catch(err =>{
        console.log("OH NO MONGO CONNECTION ERROR!!!");
        console.log(err);
});

async function main(){
        await mongoose.connect('mongodb://localhost:27017/purchaseDB', {useNewUrlParser: true, useUnifiedTopology:true})
};

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

//To Login
app.get('/login', (req,res)=>{
        res.status(200);
        res.render(`pages/login`);
        res.end();
})

//To submit registered page
app.post('/register', async(req,res) =>{
        try{
                const password = req.body.Password;
                const cpassword = req.body.ConfirmPassword;
                if(password === cpassword){

                        const registerUser = new User({
                                Firstname : req.body.Firstname,
                                Lastname : req.body.Lastname,
                                Email : req.body.Email,
                                PhoneNumber : req.body.PhoneNumber,
                                Gender : req.body.Gender,
                                DOB : req.body.DOB,
                                Address: req.body.Address,
                                City: req.body.City,
                                State: req.body.State,
                                Password: password,
                                ConfirmPassword : cpassword
                        });

                        const registered = await registerUser.save();
                        res.status(201);
                        res.send(req.body.Firstname);
                        res.end();     
                }else{
                        const script = `<script>alert("Both passwords do not match").window.location.href = "/register"</script>`;
                        res.send(script);
                }
        }catch(error){
                res.status(400);
                res.send(error);
        }
        
        
})
const PORT = process.env.PORT || 3030;
app.listen(PORT, ()=>{
        console.log(`APP is listening on port ${PORT}!`);
        console.log(`press ctrl+c to quit`);
})
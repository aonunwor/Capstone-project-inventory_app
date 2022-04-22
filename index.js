const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const { Console } = require('console');
const bodyParser = require('body-parser');
const User = require(`./models/user`);
const req = require('express/lib/request');
const res = require('express/lib/response');

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
        await mongoose.connect('mongodb+srv://dbAcho2:dbColours1@cluster0.snmtt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
        {useNewUrlParser: true, useUnifiedTopology:true}, ()=>{
                console.log("connected");
        }
)};
//Home page
app.get('/', (req, res)=>{
    res.status(200);
    res.render(`pages/home`)
    res.end();
})

//Register page
app.get('/register', (req,res)=>{
        res.status(200);
        res.render(`pages/register`);
        res.end();
})

//Show logged in page
app.get('/account/:id/', async (req, res) => {
        const { id } = req.params;
        const eachUser = await User.findById(id);
        res.render(`pages/loggedin`, {eachUser});
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
                const email = req.body.Email;
                const usedemail = User.findOne({Email: email});

                if(password === cpassword){
                        if(email === usedemail){
                                const script = `<script>alert("Email has already been used"); window.location.href="/register"</script>`;
                                res.send(script);
                        }else{
                        const registerUser = new User({
                                Firstname : req.body.Firstname,
                                Lastname : req.body.Lastname,
                                Email : email,
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
                        res.render(`pages/login`);
                        res.end();
                        }     
                }else{
                        const script = `<script>alert("Both passwords do not match").window.location.href = "/register"</script>`;
                        res.send(script);
                }
        }catch(error){
                res.status(400);
                res.send(error);
        }
        
        
});

//TO LOGIN
app.post('/login', async(req,res)=>{
        try{
                const email = req.body.Email;
                const password = req.body.Password;

                const useremail = await User.findOne({Email: email});

                const id = req.body._id;
                const eachUser = User.findById(id);

                if(useremail.Password === password){
                        res.status(201);
                        res.send(`<p>Welcome ${useremail.Firstname}, click <a href="/account/${useremail._id}">here</a> to proceed to your dashboard</p>`);
                        res.end();
                }else{
                        res.send("passwords do not match");
                }
        }catch(error){
                res.status(400);
                res.send("Invalid Email");
        }
});

//FOR PRODUCTS
app.get("/:id/new", (req, res)=>{
        res.status(200);
        res.render(`products/new`);
        res.end();
})

//Start the server
const PORT = process.env.PORT || 3030;
app.listen(PORT, ()=>{
        console.log(`APP is listening on port ${PORT}!`);
        console.log(`press ctrl+c to quit`);
})
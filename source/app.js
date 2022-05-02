// const { response } = require('express');
const express = require('express');
// const async = require('hbs/lib/async');
const app = express();

// const async = require('hbs/lib/async');

const path = require("path");
require("./db/conn")

const Register = require("./models/register");
const { json } = require('express')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../")
app.use(express.static(static_path))

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/register", (req, res) => {
    res.render("register");
});

// Create a new user in our Database
app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const ConfirmPassword = req.body.ConfirmPassword;
        if (password == ConfirmPassword) {

            const data = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                gender: req.body.gender,
                phone: req.body.phone,
                age: req.body.age,
                password: password,
                ConfirmPassword: ConfirmPassword
            })
            const result = await data.save();
            // res.status(201).render("index");
            
        }
        else {
            res.send("Password is not matching");
            }


    } catch (error) { 
        res.status(400).send("There is some error!");
    }
});

app.listen(port, () => {
    console.log(`Our port is runnning at ${port}`);
})
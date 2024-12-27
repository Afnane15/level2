const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const express = require('express');
const bodyParser = require('body-parser');
const {validationResult , check} = require('express-validator');
const { compile } = require('ejs');
const app = express();
const port = process.env.PORT || 5000;
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.get('/register',(req,res) => {

    res.render('form')
})

app.post('/register', [
    check('Full Name', 'It cannot contain numbers.')
    .matches(/^[a-zA-Z]+(?:\s[a-zA-Z]+)*$/),
    check('Email')
    .isEmail()
    .matches(/^[a-zA-Z\s]+@gmail.com$/)
    .withMessage('Invalid Email, it must be @gmail.com'),
    check('Password')
    .isLength({min: 8 , max: 64})
    .withMessage('Must be between 8 and 64 characters')
    .isAlphanumeric()
    .withMessage('contains at least one number')
    .matches(/[A-Z]/)
    .withMessage('must contain at least one upercase character')
    .matches(/[a-z]/)
    .withMessage('containes at least one lowercase character'),
    check('Password confirm')
    .custom((value, { req }) => {
    if (value !== req.body['Password']) {
        throw new Error('Passwords do not match');
    }
    return true; 
    }),
    check('Date of Birth','Must be a date bro.')
    .isDate()
],(req,res) => {
   const errors = validationResult(req);

   if(!errors.isEmpty()){
    const alert = errors.array()
    alert.forEach(a => console.log(a))
   }else{
    console.log('SUCCESSFUL!')
    res.render('form')
   }
   
})

app.listen(port, () => {
    console.log(`listening on port: ${port}` )
})
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport')
const initializePassport = require('./passport-config')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

initializePassport(passport, email =>  users.find(user => user.email === email),
   id =>   users.find(user => user.id === id)
   )
// express app 
const app = express();

// save user info (later in database)!
const users = []

app.set('view-engine', 'ejs')
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'))
// listen for requests 
app.listen(7000);



// static files
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

// add checkAuthenticated for authentication check !!!

app.get('/', (req, res) => {
    res.sendFile('./views/index.html', { root: __dirname})
})

app.get('/cart', (req, res) => {
    res.sendFile('./views/cart.html', { root: __dirname})
})

app.get('/registration', (req, res) => {
    res.sendFile('./views/registration.html', { root: __dirname})
})
app.get('/addProduct', (req, res) => {
    res.sendFile('./views/addProduct.html', { root: __dirname})
})

app.get('/product.html/:id'), (req, res) => {
    const id = req.params.id
}

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
    console.log(users);
})

app.delete('/logout', (req, res ) => {
    req.logOut();
    res.redirect('/login')
})

function checkAuthenticated (req, res, next) {
    if (req.isAuthenticated()){
        return next()
    }
res.redirect('/login')
}

// add that function in login page request , register 
function checkNotAuthenticated (req, res, next) {
    if (req.isAuthenticated()){
      return  res.redirect('/')
    }
    next();
}




// const mysql = require('mysql');
const { name } = require('ejs');
const { Passport } = require('passport/lib');
const res = require('express/lib/response');

// create connection 

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: 'products'
// }
// )

// connect to mysql
// db.connect((err) => {
//   if (err) {
//     throw err
//   }
//   console.log('MySQL connected');
// })


// create database
// app.get('/createdb', (req, res) => {
//   let sql = 'CREATE DATABASE products'
//   db.query(sql, err => {
//     if (err) {
//       throw err
//     }
//     res.send('database created')
//   })
// })

//create table 
// app.get('/createproduct', (req, res) => {
//     let sql = 'CREATE TABLE products(id int AUTO_INCREMENT, name VARCHAR (255), description VARCHAR(255), image_src VARCHAR (255), price int, PRIMARY KEY(id))'
//     db.query(sql, err => {
//         if (err) {
//             throw err
//         }
//         res.send('table created')
// })
// })

// insert into table
// app.post('/', (req, res) =>{
//     let product = req.body;

//    db.query('INSERT INTO products SET ?', product, (err) => {
//        if (err) {
//            throw err
//        }
//        res.send('inserted')
//    })
// })



//404 page
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname})
})



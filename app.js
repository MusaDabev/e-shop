if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const initializePassport = require('./passport-config');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const Products = require('./models/products');
const path = require('path')

initializePassport(passport, email =>  users.find(user => user.email === email),
   id =>   users.find(user => user.id === id)
   )
// express app 
const app = express();

// save user info (later in database)!
const users = []


app.set('view engine', 'ejs')
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'))





// static files
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/addprod', (req, res) => {
    let product = new Products(req.body)
    product.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    })
})

app.get('/', (req, res) => {
    const product = [{
        name: 'Mario',
        description: 'helo'
    
    }]
    
    Products.find()
    .then((result) => {
        res.render('index', {title: 'Products', product: result} )
    })
    .catch((err) => {
        console.log(err);
    })
})

// add checkAuthenticated for authentication check !!!

// Routs


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


const { name } = require('ejs');
const { Passport } = require('passport/lib');
const res = require('express/lib/response');

//404 page
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname})
})

// listen for requests 
app.listen(process.env.PORT);



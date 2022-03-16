const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/products')
.then((result) => console.log('Connected to database'))
.catch((err) => console.log(err))

let productSchema = mongoose.Schema({
    name: String,
    description: String,
    image_src: String,
    price: Number
})

let Products = mongoose.model('Products', productSchema);

module.exports = Products;

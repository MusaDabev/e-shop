const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
 console.log('request made');
 // set header content type
 res.setHeader('Content-Type', 'text/html');

 let path = './Pages/'
 switch(req.url) {
     case '/index.html':
         path += 'index.html'
         res.statusCode = 200;
         break;
    case '/cart.html': 
        path += 'cart.html'
        res.statusCode = 200;
        break;
    case '/product.html':
        path += 'product.html'
        res.statusCode = 200;
        break;
    case '/thankYouForSub.html':
        path += 'thankYouForSub.html'
        res.statusCode = 200;
        break;
    default:
        path += '404.html'
        res.statusCode = 404;
        break;

 }

 // send an html file
 fs.readFile(path, (err, data) => {
if (err) {
    console.log(err);
    res.end();
} else {
    res.write(data)
    res.end();
}
 })
});

server.listen(7000, 'localhost', () => {
    console.log('listening for requests on port 7000');
})
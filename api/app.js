const express = require('express');
const app = express();
const morgan = require('morgan'); // Http isteklerini kaydetmek için kullanılır.

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

app.use(morgan('dev'));

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error:{
            message: err.message
        }
    })
})




module.exports = app;
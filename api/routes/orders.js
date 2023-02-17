const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const order = require('../models/order');

const Order = require('../models/order');
const product = require('../models/product');

router.get('/', (req, res, next) => {
    Order
        .find({})
        .select('productId quantity')
        .exec()
        .then(doc => {
            res.status(200).json({ 
                count:doc.length,
                orders:doc
             });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
});

router.post('/', (req, res, next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        productId: req.body.productId,
        quantity: req.body.quantity
    })
    order
        .save()
        .then(result => {
            res.status(201).json({ message: 'Added order', result });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })

});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order
        .findById(id)
        .select('productId quantity')
        .exec()
        .then(order => {
            res.status(200).json({ order,id});
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
});


module.exports = router;
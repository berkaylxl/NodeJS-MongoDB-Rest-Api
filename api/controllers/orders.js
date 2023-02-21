const Order = require('../models/order');
const mongoose = require('mongoose');

exports.orders_get_all = (req, res, next) => {
    Order
        .find({})
        .select('product quantity')
        .populate('product', ['name', 'price'])
        .exec()
        .then(doc => {
            res.status(200).json({
                count: doc.length,
                orders: doc
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
}

exports.orders_create = (req, res, next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        product: req.body.productId,
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
}

exports.order_get_by_id =(req, res, next) => {
    const id = req.params.orderId;
    Order
        .findById(id)
        .select('product quantity')
        .populate('product')
        .exec()
        .then(order => {
            res.status(200).json(order);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })
}
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');


router.get('/', (req, res, next) => {
    Product.find()
        .exec()
        .then(docs => {
            res.status(200).json({ docs });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product
        .save()
        .then(result => {
            res.status(201).json({
                message: "Added product",
                result
            })
        })
        .catch(err=>{
            res.status(500).json({error:err});
            
        });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .exec()
        .then(docs => {
            res.status(200).json({ docs });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });

});

router.put('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};

    for (const key in req.body) {
        updateOps[key] = req.body[key];
    }
    Product.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({ message: 'Updated product', result });
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
});

router.delete('/:productId', (req, res, next) => {

    const id = req.params.productId;
    Product.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Deleted product",
                result
            });
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
});





module.exports = router;
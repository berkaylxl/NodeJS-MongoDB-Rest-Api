
const Product = require('../models/product');
const mongoose = require('mongoose');

exports.products_get_all = (req, res, next) => {
    Product.find()
        .select('name price _id productImage')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                products: docs
            });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

exports.products_create = (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product
        .save()
        .then(result => {
            res.status(201).json({
                message: "Added product",
                result
            })
        })
        .catch(err => {
            res.status(500).json({ error: err });

        });
}

exports.products_get_by_id = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select('name price _id productImage')
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });

}
exports.products_update = (req, res, next) => {
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
}
exports.products_delete = (req, res, next) => {

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
}
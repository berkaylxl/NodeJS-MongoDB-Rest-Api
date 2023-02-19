const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const crypto = require('crypto');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(16, (err, buf) => {
            err
                ? cb(err, null)
                : cb(null, buf.toString('hex') + '_' + file.originalname);
        })
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('The only accepted file types are jpeg and png.'), false);
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
});

const Product = require('../models/product');


router.get('/', (req, res, next) => {
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
});

router.post('/', upload.single('productImage'), (req, res, next) => {
    
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
});

router.get('/:productId', (req, res, next) => {
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
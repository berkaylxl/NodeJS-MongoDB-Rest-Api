const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const crypto = require('crypto');
const checkAuth = require('../middlewares/check-auth');

const ProductsController =require('../controllers/products')

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

router.get('/', checkAuth,ProductsController.products_get_all);

router.post('/', checkAuth, upload.single('productImage'),ProductsController.products_create);

router.get('/:productId', checkAuth, ProductsController.products_get_by_id );

router.put('/:productId', checkAuth, ProductsController.products_update);

router.delete('/:productId', checkAuth, ProductsController.products_delete );


module.exports = router;
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.users_sign_up = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Mail exists'
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({ error: err })
                    }
                    else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        })
                        user
                            .save()
                            .then(result => {
                                return res.status(201).json({ message: 'Successfull' })
                            })
                            .catch(err => {
                                return res.status(500).json({ error: err });
                            })
                    }
                });
            }
        })
}
exports.users_delete =(req, res, next) => {
    User.deleteOne({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({ result });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        })

}
exports.users_login =  (req, res, next) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({ message: 'Auth Failed' })
            }
            else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        return res.status(401).json({ message: 'Auth Failed' })
                    }
                    if (result) {
                        const token = jwt.sign(
                            {
                                email: user.email,
                                userId: user._id
                            },
                            "s3cr3tKeY",
                            {
                                expiresIn: "1h"
                            },
                        )
                        return res.status(200).json({
                            message: 'Auth Successfull',
                            token: token,
                        })
                    }
                    return res.status(401).json({ message: 'Auth Failed' })
                })
            }
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })

}
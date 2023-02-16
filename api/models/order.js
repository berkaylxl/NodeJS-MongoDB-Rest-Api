const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    productId: mongoose.Types.ObjectId,
    quantity: Number
});

module.exports=mongoose.model('Order',orderSchema);

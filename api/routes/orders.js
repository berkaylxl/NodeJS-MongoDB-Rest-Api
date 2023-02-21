const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/check-auth');



const OrdersController = require('../controllers/orders');


router.get('/', checkAuth, OrdersController.orders_get_all);

router.post('/', checkAuth,OrdersController.orders_create);

router.get('/:orderId', checkAuth,OrdersController.order_get_by_id);


module.exports = router;
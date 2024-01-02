const express = require("express");
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const cartController = require('../controller/cartController');

router.post('/add/:id',requireAuth, cartController.addToCart);
router.post('/remove/:id',requireAuth, cartController.removeFromCart);
router.get('/viewcart',requireAuth, cartController.viewCart);
router.post('/checkout',requireAuth, cartController.checkout);

module.exports = router;
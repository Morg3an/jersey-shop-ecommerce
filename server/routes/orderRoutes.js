const express = require('express');
const router = express.Router();
const {
  placeOrder,
  getAllOrders,
  getOrderById,
  getMyOrders,
  updateOrderStatus,
  deleteOrder,
  cancelMyOrder
} = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/auth');

// POST a new order
router.post('/', protect, placeOrder);

// Protected: View my orders
router.get('/me', protect, getMyOrders);

// Protected: Cancel my order
router.patch('/:id/cancel', protect, cancelMyOrder);

// Admin-only: Patch update order status
router.patch('/:id/status', protect, adminOnly, updateOrderStatus);

// Protected and admin-only: View orders
router.get('/', protect, adminOnly, getAllOrders);
router.get('/:id', protect, adminOnly, getOrderById);

// Admin-only: Delete order
router.delete('/:id', protect, adminOnly, deleteOrder);

module.exports = router;
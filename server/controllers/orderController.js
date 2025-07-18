// backend/controllers/orderController.js
const Order = require('../models/Order');
const Product = require('../models/Product');
const { sendWhatsAppMessage } = require('../services/whatsappService');
const { sendSMS } = require('../services/smsService');
const { sendEmail } = require('../services/emailService');

const placeOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);

    const fullOrder = await Order.findById(newOrder._id).populate('product');
    if (!fullOrder || !fullOrder.product) {
      return res.status(400).json({ success: false, error: 'Product not found or failed to populate' });
    }

    try {
      await sendWhatsAppMessage(fullOrder);
    } catch (err) {
      console.error('❌ Failed to send WhatsApp message:', err.message);
    }

    try {
      await sendSMS(fullOrder);
    } catch (err) {
      console.error('❌ Failed to send SMS:', err.message);
    }

    try {
      await sendEmail(fullOrder);
    } catch (err) {
      console.error('❌ Failed to send customer email:', err.message);
    }

    /* @TODO: Uncomment when shop email functionality is implemented
    try {
      await sendEmailToShop(fullOrder);
    } catch (err) {
      console.error('❌ Failed to send shop email:', err.message);
    } */

    res.status(201).json({ success: true, order: fullOrder });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const filter = {};

    // Allow ?status=shipped or ?status=pending etc
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const orders = await Order.find(filter).populate('product');
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('product');
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const myOrders = await Order.find({ user: userId }).populate('product');

    res.status(200).json({ success: true, orders: myOrders });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Failed to fetch your orders' });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }
    res.status(200).json({ success: true, message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'shipped', 'delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status value' });
    }

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ success: false, error: 'Order not found' });

    order.status = status;
    await order.save();

    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const cancelMyOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ success: false, error: 'Order not found' });
    }

    // Must belong to the current user
    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, error: 'Not authorized to cancel this order' });
    }

    // Must be pending
    if (order.status !== 'pending') {
      return res.status(400).json({ success: false, error: 'Only pending orders can be cancelled' });
    }

    order.status = 'cancelled';
    await order.save();

    res.status(200).json({ success: true, message: 'Order cancelled successfully', order });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


module.exports = {
  placeOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
  updateOrderStatus,
  cancelMyOrder,
  getMyOrders
};
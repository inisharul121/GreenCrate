const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET dashboard stats
router.get('/stats', async (req, res) => {
  try {
    const [revenue] = await pool.query('SELECT SUM(total_amount) as total FROM orders WHERE status != "cancelled"');
    const [activeOrders] = await pool.query('SELECT COUNT(*) as count FROM orders WHERE status IN ("pending", "processing", "shipped")');
    const [newCustomers] = await pool.query('SELECT COUNT(*) as count FROM users WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)');
    const [totalProducts] = await pool.query('SELECT COUNT(*) as count FROM products');

    res.json({
      revenue: revenue[0].total || 0,
      activeOrders: activeOrders[0].count || 0,
      newCustomers: newCustomers[0].count || 0,
      totalProducts: totalProducts[0].count || 0,
      subscriptionRate: 84 // Hardcoded for now as we don't have user subscription data yet
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET recent orders
router.get('/recent-orders', async (req, res) => {
  try {
    const [orders] = await pool.query(`
      SELECT o.*, u.full_name as customer_name 
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
      LIMIT 5
    `);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all orders
router.get('/orders', async (req, res) => {
  try {
    const [orders] = await pool.query(`
      SELECT o.*, u.full_name as customer_name, u.email as customer_email,
      (SELECT GROUP_CONCAT(CONCAT(p.name, ' (x', oi.quantity, ')') SEPARATOR ', ') 
       FROM order_items oi 
       JOIN products p ON oi.product_id = p.id 
       WHERE oi.order_id = o.id) as items_summary
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET customers
router.get('/customers', async (req, res) => {
  try {
    const [customers] = await pool.query(`
      SELECT u.id, u.full_name as name, u.email, u.created_at,
      (SELECT COUNT(*) FROM orders WHERE user_id = u.id) as order_count,
      (SELECT IFNULL(SUM(total_amount), 0) FROM orders WHERE user_id = u.id) as total_spend
      FROM users u
      WHERE u.role = 'customer'
      ORDER BY total_spend DESC
    `);
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all subscriptions for admin
router.get('/subscriptions', async (req, res) => {
  try {
    const [subscriptions] = await pool.query(`
      SELECT
        s.*,
        p.name AS product_name,
        u.full_name AS customer_name,
        u.email AS customer_email
      FROM subscriptions s
      LEFT JOIN products p ON s.product_id = p.id
      LEFT JOIN users u ON s.user_id = u.id
      ORDER BY s.created_at DESC
    `);
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

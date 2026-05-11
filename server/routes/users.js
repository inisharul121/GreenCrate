const express = require('express');
const router = express.Router();
const pool = require('../db');

function getNextDeliveryDate(frequency, fromDate = new Date()) {
  const nextDate = new Date(fromDate);
  const normalizedFrequency = (frequency || '').toLowerCase();

  if (normalizedFrequency === 'weekly') {
    nextDate.setDate(nextDate.getDate() + 7);
  } else if (normalizedFrequency === 'biweekly') {
    nextDate.setDate(nextDate.getDate() + 14);
  } else {
    nextDate.setMonth(nextDate.getMonth() + 1);
  }

  return nextDate.toISOString().slice(0, 10);
}

// GET user dashboard summary
router.get('/summary/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const [lastOrder] = await pool.query(
      `SELECT o.*,
       (SELECT p.image FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = o.id LIMIT 1) as image,
       (SELECT p.name FROM order_items oi JOIN products p ON oi.product_id = p.id WHERE oi.order_id = o.id LIMIT 1) as product_name
       FROM orders o
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT 1`,
      [userId]
    );

    const [activeSubscriptions] = await pool.query(
      `SELECT s.id, s.frequency, s.status, s.next_delivery_date, p.name
       FROM subscriptions s
       JOIN products p ON s.product_id = p.id
       WHERE s.user_id = ? AND s.status IN ('active', 'paused')
       ORDER BY s.created_at DESC
       LIMIT 2`,
      [userId]
    );

    res.json({
      lastOrder: lastOrder[0] || null,
      subscriptions: activeSubscriptions,
      activeSubscriptionCount: activeSubscriptions.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET user orders with details
router.get('/:userId/orders', async (req, res) => {
  try {
    const { userId } = req.params;
    const [orders] = await pool.query(
      `SELECT o.*,
       (SELECT GROUP_CONCAT(CONCAT(p.name, ' (x', oi.quantity, ')') SEPARATOR ', ')
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = o.id) as items_summary
       FROM orders o
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [userId]
    );
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET user subscriptions
router.get('/:userId/subscriptions', async (req, res) => {
  try {
    const { userId } = req.params;
    const [subscriptions] = await pool.query(
      `SELECT s.*, p.name, p.price as base_price
       FROM subscriptions s
       JOIN products p ON s.product_id = p.id
       WHERE s.user_id = ?
       ORDER BY s.created_at DESC`,
      [userId]
    );
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT pause subscription
router.put('/:userId/subscriptions/:subscriptionId/pause', async (req, res) => {
  try {
    const { userId, subscriptionId } = req.params;
    const [result] = await pool.query(
      `UPDATE subscriptions
       SET status = 'paused', paused_at = NOW()
       WHERE id = ? AND user_id = ? AND status = 'active'`,
      [subscriptionId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Active subscription not found for this user' });
    }

    res.json({ message: 'Subscription paused successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT resume subscription
router.put('/:userId/subscriptions/:subscriptionId/resume', async (req, res) => {
  try {
    const { userId, subscriptionId } = req.params;
    const [rows] = await pool.query(
      'SELECT frequency FROM subscriptions WHERE id = ? AND user_id = ? AND status = ?',
      [subscriptionId, userId, 'paused']
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Paused subscription not found for this user' });
    }

    const nextDeliveryDate = getNextDeliveryDate(rows[0].frequency);
    await pool.query(
      `UPDATE subscriptions
       SET status = 'active', paused_at = NULL, next_delivery_date = ?, updated_at = NOW()
       WHERE id = ? AND user_id = ?`,
      [nextDeliveryDate, subscriptionId, userId]
    );

    res.json({ message: 'Subscription resumed successfully', next_delivery_date: nextDeliveryDate });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT cancel subscription
router.put('/:userId/subscriptions/:subscriptionId/cancel', async (req, res) => {
  try {
    const { userId, subscriptionId } = req.params;
    const [result] = await pool.query(
      `UPDATE subscriptions
       SET status = 'cancelled', cancelled_at = NOW(), updated_at = NOW()
       WHERE id = ? AND user_id = ? AND status <> 'cancelled'`,
      [subscriptionId, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Subscription not found for this user' });
    }

    res.json({ message: 'Subscription cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

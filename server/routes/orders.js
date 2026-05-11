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

// POST a new order
router.post('/', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const { id, userId, totalAmount, items } = req.body;

    // Create order
    await connection.query(
      'INSERT INTO orders (id, user_id, total_amount, status) VALUES (?, ?, ?, ?)',
      [id, userId || null, totalAmount, 'pending']
    );

    // Create order items
    for (const item of items) {
      const [insertOrderItemResult] = await connection.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price, purchase_type, frequency) VALUES (?, ?, ?, ?, ?, ?)',
        [id, item.product.id, item.quantity, item.price || 0, item.purchaseType, item.frequency || null]
      );

      if (item.purchaseType === 'subscription') {
        await connection.query(
          `INSERT INTO subscriptions (user_id, product_id, order_item_id, frequency, status, started_at, next_delivery_date)
           VALUES (?, ?, ?, ?, 'active', NOW(), ?)`,
          [
            userId || null,
            item.product.id,
            insertOrderItemResult.insertId,
            item.frequency || 'monthly',
            getNextDeliveryDate(item.frequency),
          ]
        );
      }
    }

    await connection.commit();
    res.status(201).json({ message: 'Order created successfully', orderId: id });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ message: error.message });
  } finally {
    connection.release();
  }
});

// GET user orders
router.get('/user/:userId', async (req, res) => {
  try {
    const [orders] = await pool.query('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [req.params.userId]);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

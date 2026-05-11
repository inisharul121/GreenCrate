const express = require('express');
const router = express.Router();
const pool = require('../db');

function createProductId(name) {
  return String(name || 'product')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 40);
}

// GET all products
router.get('/', async (req, res) => {
  try {
    const [products] = await pool.query(`
      SELECT p.*, c.name as category_name, c.label as category_label 
      FROM products p
      JOIN categories c ON p.category_id = c.id
    `);

    // Fetch subscription prices for each product
    const productsWithPrices = await Promise.all(products.map(async (p) => {
      const [subPrices] = await pool.query('SELECT frequency, price FROM subscription_prices WHERE product_id = ?', [p.id]);
      
      const pricesMap = {};
      subPrices.forEach(sp => {
        pricesMap[sp.frequency] = sp.price;
      });

      return {
        ...p,
        reviewCount: p.review_count || 0,
        inStock: Boolean(p.in_stock),
        seasonal: Boolean(p.seasonal || false),
        subscriptionPrices: pricesMap,
        badges: [], 
        dietaryTags: [] 
      };
    }));

    res.json(productsWithPrices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create product
router.post('/', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const {
      id,
      name,
      description = '',
      price,
      category_name,
      image = '',
      in_stock = true,
      rating = 0,
      review_count = 0,
      subscriptionPrices = {},
    } = req.body;

    if (!name || !category_name || price === undefined || price === null) {
      return res.status(400).json({ message: 'name, category_name, and price are required' });
    }

    const [categoryRows] = await connection.query(
      'SELECT id FROM categories WHERE name = ? LIMIT 1',
      [String(category_name).toLowerCase()]
    );

    if (categoryRows.length === 0) {
      return res.status(400).json({ message: 'Invalid category_name' });
    }

    const productId = id || createProductId(name);
    await connection.query(
      `INSERT INTO products (id, name, description, price, category_id, image, in_stock, rating, review_count)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        productId,
        name,
        description,
        Number(price),
        categoryRows[0].id,
        image,
        Boolean(in_stock),
        Number(rating),
        Number(review_count),
      ]
    );

    const allowedFrequencies = ['weekly', 'biweekly', 'monthly'];
    for (const frequency of allowedFrequencies) {
      const maybePrice = subscriptionPrices[frequency];
      if (maybePrice !== undefined && maybePrice !== null && maybePrice !== '') {
        await connection.query(
          'INSERT INTO subscription_prices (product_id, frequency, price) VALUES (?, ?, ?)',
          [productId, frequency, Number(maybePrice)]
        );
      }
    }

    await connection.commit();
    res.status(201).json({ message: 'Product created successfully', id: productId });
  } catch (error) {
    await connection.rollback();
    if (error && error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Product ID already exists' });
    }
    res.status(500).json({ message: error.message });
  } finally {
    connection.release();
  }
});

// GET product by ID
router.get('/:id', async (req, res) => {
  try {
    const [products] = await pool.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (products.length === 0) return res.status(404).json({ message: 'Product not found' });
    
    const product = products[0];
    const [subPrices] = await pool.query('SELECT frequency, price FROM subscription_prices WHERE product_id = ?', [product.id]);
    
    const pricesMap = {};
    subPrices.forEach(sp => {
      pricesMap[sp.frequency] = sp.price;
    });

    // Map DB fields to Frontend expected fields
    const formattedProduct = {
      ...product,
      reviewCount: product.review_count || 0,
      inStock: Boolean(product.in_stock),
      seasonal: Boolean(product.seasonal || false),
      badges: [],
      dietaryTags: [],
      subscriptionPrices: pricesMap
    };

    res.json(formattedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

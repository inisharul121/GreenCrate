const pool = require('./db');

const categories = [
  { name: 'fruits', label: 'Fruit Boxes' },
  { name: 'catering', label: 'Meeting Catering' },
  { name: 'gifts', label: 'Corporate Gifts' }
];

const products = [
  // Fruits
  {
    id: "fruit-001",
    name: "Classic Fruit Box",
    description: "A handpicked selection of 12 seasonal fruits — Rajshahi mangoes, local bananas, citrus & berries. Perfect for a team of 5–8.",
    price: 3490,
    category: "fruits",
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&q=80",
    rating: 4.9,
    review_count: 218,
    in_stock: true,
    subscriptionPrices: { weekly: 2990, biweekly: 3190, monthly: 3290 }
  },
  {
    id: "fruit-002",
    name: "Seasonal Harvest Box",
    description: "Curated around what's perfectly ripe right now. Sourced from local Bangladeshi farms in Sylhet & North Bengal.",
    price: 3850,
    category: "fruits",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&q=80",
    rating: 4.8,
    review_count: 142,
    in_stock: true,
    subscriptionPrices: { weekly: 3300, biweekly: 3500, monthly: 3650 }
  },
  {
    id: "fruit-003",
    name: "Tropical Exotic Box",
    description: "Local mangoes, papayas, dragon fruit, lychees & jackfruit. The best of Bangladesh for your office.",
    price: 5400,
    category: "fruits",
    image: "https://images.unsplash.com/photo-1546484475-7f7bd55792da?w=600&q=80",
    rating: 4.7,
    review_count: 89,
    in_stock: true,
    subscriptionPrices: { weekly: 4800, biweekly: 5000, monthly: 5200 }
  },
  {
    id: "fruit-004",
    name: "Office Snack Pack",
    description: "Individual snack packs — small teams or hot desks. Guavas, plums, grapes & local clementines.",
    price: 2200,
    category: "fruits",
    image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=600&q=80",
    rating: 4.6,
    review_count: 67,
    in_stock: true,
    subscriptionPrices: { weekly: 1850, biweekly: 1950, monthly: 2050 }
  },
  {
    id: "cat-001",
    name: "Artisan Pastry Basket",
    description: "Freshly baked butter croissants, local style sweet buns & almond twists. Min. 10 pcs.",
    price: 3800,
    category: "catering",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80",
    rating: 4.9,
    review_count: 312,
    in_stock: true,
    subscriptionPrices: { weekly: 3200, biweekly: 3400, monthly: 3600 }
  },
  {
    id: "cat-002",
    name: "Power Grain Bowl",
    description: "Local grains, roasted seasonal veggies, avocado & tahini dressing. Individually portioned.",
    price: 1450,
    category: "catering",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    rating: 4.7,
    review_count: 198,
    in_stock: true,
    subscriptionPrices: { weekly: 1250, biweekly: 1300, monthly: 1350 }
  },
  {
    id: "cat-003",
    name: "Artisan Coffee Box",
    description: "12 × 250ml cold brew coffee cans using local beans. Smooth, low-acid, ready to drink.",
    price: 3600,
    category: "catering",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80",
    rating: 4.8,
    review_count: 155,
    in_stock: true,
    subscriptionPrices: { weekly: 3000, biweekly: 3200, monthly: 3300 }
  },
  {
    id: "gift-001",
    name: "Wellness Gift Box",
    description: "Premium fruit selection + local organic teas + artisan dark chocolate. Ready to brand with your logo.",
    price: 6800,
    category: "gifts",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80",
    rating: 4.9,
    review_count: 241,
    in_stock: true,
    subscriptionPrices: { weekly: 6000, biweekly: 6300, monthly: 6500 }
  },
  {
    id: "gift-002",
    name: "Gourmet Treat Box",
    description: "Premium local sweets, artisan nuts, dried fruits & handmade biscuits. Elegantly wrapped.",
    price: 8400,
    category: "gifts",
    image: "https://images.unsplash.com/photo-1549007953-2f2dc0b24019?w=600&q=80",
    rating: 4.8,
    review_count: 176,
    in_stock: true,
    subscriptionPrices: { weekly: 7400, biweekly: 7800, monthly: 8000 }
  }
  // Add more as needed...
];

async function seed() {
  const connection = await pool.getConnection();
  try {
    console.log('Starting seeding...');
    await connection.beginTransaction();

    // 0. Create Tables if they don't exist
    console.log('Verifying schema...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        label VARCHAR(100) NOT NULL
      )
    `);
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        category_id INT,
        image VARCHAR(255),
        in_stock BOOLEAN DEFAULT TRUE,
        rating DECIMAL(3, 2) DEFAULT 0,
        review_count INT DEFAULT 0,
        FOREIGN KEY (category_id) REFERENCES categories(id)
      )
    `);
    await connection.query(`
      CREATE TABLE IF NOT EXISTS subscription_prices (
        product_id VARCHAR(50),
        frequency ENUM('weekly', 'biweekly', 'monthly'),
        price DECIMAL(10, 2) NOT NULL,
        PRIMARY KEY (product_id, frequency),
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
      )
    `);
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(255),
        role ENUM('customer', 'admin') DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(50) PRIMARY KEY,
        user_id INT,
        total_amount DECIMAL(10, 2) NOT NULL,
        status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
    await connection.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id VARCHAR(50),
        product_id VARCHAR(50),
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        purchase_type VARCHAR(20),
        frequency VARCHAR(20),
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
      )
    `);
    await connection.query(`
      CREATE TABLE IF NOT EXISTS subscriptions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        product_id VARCHAR(50) NOT NULL,
        order_item_id INT,
        frequency ENUM('weekly', 'biweekly', 'monthly') NOT NULL DEFAULT 'monthly',
        status ENUM('active', 'paused', 'cancelled') NOT NULL DEFAULT 'active',
        started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        next_delivery_date DATE,
        paused_at TIMESTAMP NULL DEFAULT NULL,
        cancelled_at TIMESTAMP NULL DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (product_id) REFERENCES products(id),
        FOREIGN KEY (order_item_id) REFERENCES order_items(id) ON DELETE SET NULL
      )
    `);

    // 1. Clear existing data
    console.log('Clearing old data...');
    await connection.query('DELETE FROM subscriptions');
    await connection.query('DELETE FROM order_items');
    await connection.query('DELETE FROM orders');
    await connection.query('DELETE FROM subscription_prices');
    await connection.query('DELETE FROM products');
    await connection.query('DELETE FROM categories');

    // 2. Insert Categories
    console.log('Inserting categories...');
    const categoryIds = {};
    for (const cat of categories) {
      const [result] = await connection.query('INSERT INTO categories (name, label) VALUES (?, ?)', [cat.name, cat.label]);
      categoryIds[cat.name] = result.insertId;
    }

    // 3. Insert Products & Subscription Prices
    console.log('Inserting products...');
    for (const p of products) {
      await connection.query(
        'INSERT INTO products (id, name, description, price, category_id, image, rating, review_count, in_stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [p.id, p.name, p.description, p.price, categoryIds[p.category], p.image, p.rating, p.review_count, p.in_stock]
      );

      if (p.subscriptionPrices) {
        for (const [freq, price] of Object.entries(p.subscriptionPrices)) {
          await connection.query(
            'INSERT INTO subscription_prices (product_id, frequency, price) VALUES (?, ?, ?)',
            [p.id, freq, price]
          );
        }
      }
    }

    await connection.commit();
    console.log('Seeding completed successfully!');
  } catch (error) {
    await connection.rollback();
    console.error('Seeding failed:', error);
  } finally {
    connection.release();
    process.exit();
  }
}

seed();

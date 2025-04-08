require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'StepsUp',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// JWT middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
// Registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { email, phone, name, password } = req.body;
    
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert new user with default customer role (3)
    const [result] = await pool.execute(
      'INSERT INTO users (email, phone, name, password, role_id) VALUES (?, ?, ?, ?, 3)',
      [email, phone || null, name || null, hashedPassword]
    );

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: result.insertId, 
        email,
        role: 'customer'
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({ 
      success: true,
      token,
      user: {
        id: result.insertId,
        email,
        name,
        phone,
        role: 'customer'
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Get user with role information
    const [users] = await pool.execute(`
      SELECT u.*, r.name as role_name 
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.email = ?`,
      [email]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = users[0];
    
    // Verify password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        role: user.role_name
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ 
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role_name
      }
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Cart endpoints
app.post('/api/cart/add', authenticateToken, async (req, res) => {
  try {
    const { productId, size, quantity = 1 } = req.body;
    const userId = req.user.userId;

    // Get or create user's cart
    const [carts] = await pool.execute(
      'SELECT id FROM carts WHERE user_id = ?',
      [userId]
    );
    
    let cartId;
    if (carts.length === 0) {
      const [result] = await pool.execute(
        'INSERT INTO carts (user_id) VALUES (?)',
        [userId]
      );
      cartId = result.insertId;
    } else {
      cartId = carts[0].id;
    }

    // Check product availability
    const [inventory] = await pool.execute(
      'SELECT stock FROM product_inventory WHERE product_id = ? AND size = ?',
      [productId, size]
    );
    
    if (inventory.length === 0 || inventory[0].stock < quantity) {
      return res.status(400).json({ error: 'Product not available in requested size/quantity' });
    }

    // Add item to cart
    await pool.execute(
      `INSERT INTO cart_items (cart_id, product_id, size, quantity)
       VALUES (?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`,
      [cartId, productId, size, quantity]
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});

app.get('/api/cart', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Get cart with items and product details
    const [cart] = await pool.execute(
      `SELECT 
        ci.id, 
        ci.product_id, 
        p.title, 
        p.price, 
        ci.size, 
        ci.quantity, 
        pi.url as image,
        (p.price * ci.quantity) as item_total
       FROM carts c
       JOIN cart_items ci ON c.id = ci.cart_id
       JOIN products p ON ci.product_id = p.id
       LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_main = true
       WHERE c.user_id = ?`,
      [userId]
    );

    // Calculate cart total
    const total = cart.reduce((sum, item) => sum + parseFloat(item.item_total), 0);

    res.json({ items: cart, total });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ error: 'Failed to get cart' });
  }
});

app.put('/api/cart/item/:id', authenticateToken, async (req, res) => {
  try {
    const { quantity } = req.body;
    await pool.execute(
      'UPDATE cart_items SET quantity = ? WHERE id = ?',
      [quantity, req.params.id]
    );
    res.json({ success: true });
  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

app.delete('/api/cart/item/:id', authenticateToken, async (req, res) => {
  try {
    await pool.execute(
      'DELETE FROM cart_items WHERE id = ?',
      [req.params.id]
    );
    res.json({ success: true });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ error: 'Failed to remove from cart' });
  }
});

// Products routes
app.get('/api/products', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

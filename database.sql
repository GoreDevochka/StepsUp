-- MySQL Database Schema for StepsUp E-commerce

-- 1. User roles
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

-- 2. Users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    name VARCHAR(100),
    password VARCHAR(255) NOT NULL,
    role_id INT DEFAULT 3,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- 3. Product categories
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL
);

-- 4. Product types
CREATE TABLE IF NOT EXISTS product_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL
);

-- 5. Products
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT,
    type_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    available_sizes VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (type_id) REFERENCES product_types(id)
);

-- 6. Product inventory
CREATE TABLE IF NOT EXISTS product_inventory (
    product_id INT,
    size VARCHAR(10) NOT NULL,
    stock INT DEFAULT 0,
    PRIMARY KEY (product_id, size),
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 7. Product images
CREATE TABLE IF NOT EXISTS product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    url VARCHAR(255) NOT NULL,
    is_main BOOLEAN DEFAULT false,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 8. Carts
CREATE TABLE IF NOT EXISTS carts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 9. Cart items
CREATE TABLE IF NOT EXISTS cart_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT NOT NULL,
    product_id INT NOT NULL,
    size VARCHAR(10) NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES carts(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Sample data
INSERT IGNORE INTO roles (name, description) VALUES
('admin', 'Administrator with full access'),
('manager', 'Manager with limited admin access'),
('customer', 'Regular customer account');

INSERT IGNORE INTO users (email, password, name, role_id) VALUES
('admin@example.com', '$2a$10$xJw...', 'Admin User', 1);

INSERT IGNORE INTO categories (name, slug) VALUES
('Женское', 'female'),
('Мужское', 'male'),
('Детское', 'kids'),
('Sale', 'sale');

INSERT IGNORE INTO product_types (name, slug) VALUES
('Кроссовки', 'sneakers'),
('Ботинки', 'boots'),
('Кеды', 'keds'),
('Сумки', 'bags'),
('Аксессуары', 'accessories');

INSERT IGNORE INTO products (category_id, type_id, title, description, price, available_sizes) VALUES
(1, 1, 'Женские кроссовки Nike', 'Стильные повседневные кроссовки', 5990.00, '38,39,40'),
(2, 2, 'Мужские ботинки Timberland', 'Классические мужские ботинки', 12990.00, '42,43,44');

INSERT IGNORE INTO product_inventory (product_id, size, stock) VALUES
(1, '38', 10), (1, '39', 5),
(2, '42', 8), (2, '43', 6);

INSERT IGNORE INTO product_images (product_id, url, is_main) VALUES
(1, '/images/women-sneakers-1.jpg', true),
(2, '/images/men-boots-1.jpg', true);

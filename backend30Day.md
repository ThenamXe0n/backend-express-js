# Express.js Complete Course 2025 - Beginner to Advanced

A comprehensive 30-day journey from basics to production-ready API development.

---

## Week 1: Foundation (Days 1-7)

### Day 1: Introduction & Environment Setup

**Topics Covered:**
- What is Express.js and why use it?
- Node.js fundamentals review
- Setting up development environment
- Creating your first Express server

**Code Snippet:**
```javascript
// package.json setup
// Run: npm init -y
// Install: npm install express nodemon dotenv

// server.js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, Express.js 2025!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

**Explanation:**
- `express()` creates an Express application instance
- `app.get()` defines a route that responds to GET requests
- `app.listen()` starts the server on specified port
- The callback function `(req, res)` receives request and response objects

**Example Use Case:** Creating a simple landing page endpoint for a website.

---

### Day 2: Routing Basics

**Topics Covered:**
- HTTP methods (GET, POST, PUT, DELETE, PATCH)
- Route parameters
- Query strings
- Route organization

**Code Snippet:**
```javascript
const express = require('express');
const app = express();

// Basic routes
app.get('/users', (req, res) => {
  res.json({ message: 'Get all users' });
});

app.post('/users', (req, res) => {
  res.json({ message: 'Create a user' });
});

// Route parameters
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ message: `Get user ${userId}` });
});

// Query strings: /search?q=javascript&limit=10
app.get('/search', (req, res) => {
  const { q, limit } = req.query;
  res.json({ query: q, limit: limit || 20 });
});

app.listen(3000);
```

**Explanation:**
- `req.params` captures dynamic URL segments (e.g., `/users/123`)
- `req.query` captures query string parameters (e.g., `?q=test`)
- Different HTTP methods handle different operations (CRUD)

**Example Use Case:** Building a REST API for a blog where you can list posts, get a specific post by ID, and search posts.

---

### Day 3: Middleware Fundamentals

**Topics Covered:**
- What is middleware?
- Built-in middleware
- Custom middleware
- Middleware execution order

**Code Snippet:**
```javascript
const express = require('express');
const app = express();

// Built-in middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Custom logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next(); // Pass control to next middleware
});

// Route-specific middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

app.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'This is protected data' });
});

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(3000);
```

**Explanation:**
- Middleware functions have access to `req`, `res`, and `next()`
- `next()` passes control to the next middleware in the stack
- Middleware executes in the order it's defined
- Error-handling middleware has 4 parameters `(err, req, res, next)`

**Example Use Case:** Adding request logging, authentication checks, and error handling to your API.

---

### Day 4: Request & Response Objects

**Topics Covered:**
- Request properties and methods
- Response methods
- Sending different response types
- Status codes

**Code Snippet:**
```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/api/data', (req, res) => {
  // Request object properties
  console.log('Body:', req.body);
  console.log('Headers:', req.headers);
  console.log('IP:', req.ip);
  console.log('Method:', req.method);
  console.log('Path:', req.path);
  console.log('Cookies:', req.cookies); // Requires cookie-parser

  // Response methods
  // res.send('Text response');
  // res.json({ key: 'value' });
  // res.status(404).send('Not found');
  // res.redirect('/other-route');
  // res.download('./file.pdf');
  
  res.status(201).json({
    success: true,
    message: 'Data created',
    data: req.body
  });
});

// Sending files
app.get('/download', (req, res) => {
  res.download('./public/report.pdf', 'monthly-report.pdf');
});

// Setting custom headers
app.get('/custom', (req, res) => {
  res.set('X-Custom-Header', 'MyValue');
  res.json({ message: 'Check headers' });
});

app.listen(3000);
```

**Explanation:**
- `req.body` contains parsed request body (needs body-parser middleware)
- `res.json()` automatically sets Content-Type to application/json
- Status codes: 200 (OK), 201 (Created), 400 (Bad Request), 404 (Not Found), 500 (Server Error)
- `res.set()` sets custom response headers

**Example Use Case:** Building an API that accepts user data, validates it, and returns appropriate responses with correct status codes.

---

### Day 5: Router Modularity

**Topics Covered:**
- Express Router
- Organizing routes in separate files
- Route prefixes
- Nested routes

**Code Snippet:**
```javascript
// routes/users.js
const express = require('express');
const router = express.Router();

// Middleware specific to this router
router.use((req, res, next) => {
  console.log('User route accessed:', new Date());
  next();
});

router.get('/', (req, res) => {
  res.json({ message: 'Get all users' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Get user ${req.params.id}` });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create user', data: req.body });
});

router.put('/:id', (req, res) => {
  res.json({ message: `Update user ${req.params.id}`, data: req.body });
});

router.delete('/:id', (req, res) => {
  res.json({ message: `Delete user ${req.params.id}` });
});

module.exports = router;

// routes/posts.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Get all posts' });
});

module.exports = router;

// server.js
const express = require('express');
const app = express();
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

app.use(express.json());

// Mount routers with prefixes
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

**Explanation:**
- `express.Router()` creates modular route handlers
- Routes are organized in separate files for maintainability
- `app.use('/prefix', router)` mounts router at specific path
- Each router can have its own middleware

**Example Use Case:** Building a large API with multiple resources (users, posts, products, orders) where each resource has its own file and routes.

---

### Day 6: Static Files & Template Engines

**Topics Covered:**
- Serving static files
- Setting up view engines
- Using EJS template engine
- Rendering dynamic pages

**Code Snippet:**
```javascript
// server.js
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from 'public' directory
app.use(express.static('public'));
app.use('/assets', express.static('assets')); // Custom path

// Set up EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  const data = {
    title: 'Home Page',
    users: ['Alice', 'Bob', 'Charlie'],
    isLoggedIn: true
  };
  res.render('index', data);
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Us' });
});

app.listen(3000);
```

```html
<!-- views/index.ejs -->
<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
  <link rel="stylesheet" href="/css/style.css">
</head>
<body>
  <h1><%= title %></h1>
  
  <% if (isLoggedIn) { %>
    <p>Welcome back!</p>
  <% } else { %>
    <p>Please log in</p>
  <% } %>
  
  <ul>
    <% users.forEach(user => { %>
      <li><%= user %></li>
    <% }); %>
  </ul>
  
  <script src="/js/main.js"></script>
</body>
</html>
```

**Explanation:**
- `express.static()` serves files from a directory (CSS, JS, images)
- Template engines allow dynamic HTML generation
- `<%= %>` outputs escaped content, `<%- %>` outputs unescaped HTML
- `<% %>` executes JavaScript code without output

**Example Use Case:** Building a server-side rendered website with dynamic content, like a blog or portfolio site.

---

### Day 7: Form Handling & Validation

**Topics Covered:**
- Handling form submissions
- Input validation with express-validator
- Sanitization
- Error messages

**Code Snippet:**
```javascript
const express = require('express');
const { body, validationResult } = require('express-validator');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Validation middleware
const validateUser = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/\d/)
    .withMessage('Password must contain a number'),
  body('age')
    .optional()
    .isInt({ min: 18, max: 100 })
    .withMessage('Age must be between 18 and 100'),
  body('username')
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be 3-20 characters')
    .isAlphanumeric()
    .withMessage('Username must be alphanumeric')
];

app.post('/register', validateUser, (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false,
      errors: errors.array() 
    });
  }
  
  // Process valid data
  const { email, password, username, age } = req.body;
  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: { email, username, age }
  });
});

// Custom validation
app.post('/custom', [
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.json({ message: 'Validation passed' });
});

app.listen(3000);
```

**Explanation:**
- `express-validator` provides validation and sanitization middleware
- Validation rules are chainable and readable
- `validationResult()` collects all validation errors
- `custom()` allows complex validation logic
- Always sanitize inputs to prevent XSS attacks

**Example Use Case:** Building a registration form that validates email format, password strength, and ensures all required fields are properly formatted.

---

## Week 2: Intermediate Concepts (Days 8-14)

### Day 8: Environment Variables & Configuration

**Topics Covered:**
- Using dotenv
- Configuration management
- Environment-specific settings
- Security best practices

**Code Snippet:**
```javascript
// .env file (never commit to git!)
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp
DB_USER=admin
DB_PASSWORD=securepassword123
JWT_SECRET=your-secret-key-here
API_KEY=external-api-key

// config/config.js
require('dotenv').config();

const config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development',
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '24h'
  },
  apiKey: process.env.API_KEY
};

module.exports = config;

// server.js
const express = require('express');
const config = require('./config/config');
const app = express();

app.use(express.json());

app.get('/config', (req, res) => {
  // Never expose sensitive config to clients
  res.json({
    env: config.env,
    port: config.port
    // Don't send: secrets, passwords, API keys
  });
});

app.listen(config.port, () => {
  console.log(`Server running in ${config.env} mode on port ${config.port}`);
});
```

```
// .gitignore
node_modules/
.env
.env.local
.env.*.local
npm-debug.log
yarn-error.log
```

**Explanation:**
- Environment variables keep sensitive data out of code
- `dotenv` loads variables from `.env` file into `process.env`
- Different `.env` files for different environments (dev, staging, prod)
- Always add `.env` to `.gitignore`
- Provide `.env.example` with dummy values for other developers

**Example Use Case:** Managing database credentials, API keys, and configuration that differs between development and production environments.

---

### Day 9: Error Handling Patterns

**Topics Covered:**
- Synchronous vs asynchronous errors
- Custom error classes
- Centralized error handling
- Operational vs programmer errors

**Code Snippet:**
```javascript
// utils/errors.js
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized access') {
    super(message, 401);
  }
}

module.exports = { AppError, ValidationError, NotFoundError, UnauthorizedError };

// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    // Production: don't leak error details
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    } else {
      console.error('ERROR 💥:', err);
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong'
      });
    }
  }
};

module.exports = errorHandler;

// utils/asyncHandler.js
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = asyncHandler;

// server.js
const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const { NotFoundError, ValidationError } = require('./utils/errors');
const asyncHandler = require('./utils/asyncHandler');
const app = express();

app.use(express.json());

// Simulate async operation
app.get('/user/:id', asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  
  // Simulate database query
  const user = await findUser(id); // This could throw an error
  
  if (!user) {
    throw new NotFoundError(`User with id ${id} not found`);
  }
  
  res.json({ success: true, data: user });
}));

app.post('/validate', (req, res, next) => {
  const { email } = req.body;
  
  if (!email) {
    throw new ValidationError('Email is required');
  }
  
  res.json({ message: 'Valid' });
});

// 404 handler (must be after all routes)
app.all('*', (req, res, next) => {
  next(new NotFoundError(`Can't find ${req.originalUrl}`));
});

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(3000);

async function findUser(id) {
  // Simulate async operation
  return id === '1' ? { id: '1', name: 'John' } : null;
}
```

**Explanation:**
- Custom error classes extend `Error` for consistent error handling
- `asyncHandler` wrapper catches async errors automatically
- Centralized error handler provides consistent error responses
- Development mode shows full error details, production hides them
- Operational errors (404, validation) are user-facing, programmer errors (bugs) are not

**Example Use Case:** Building robust APIs that gracefully handle errors, provide meaningful messages to clients, and log errors for debugging.

---

### Day 10: Database Integration (MongoDB with Mongoose)

**Topics Covered:**
- Connecting to MongoDB
- Creating schemas and models
- CRUD operations
- Mongoose validation

**Code Snippet:**
```javascript
// Install: npm install mongoose

// config/database.js
const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // These options are now default in Mongoose 6+
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters'],
    maxlength: [20, 'Username cannot exceed 20 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false // Don't return password by default
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

// controllers/userController.js
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const { NotFoundError, ValidationError } = require('../utils/errors');

exports.createUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  
  // Check if user exists
  const existingUser = await User.findOne({ 
    $or: [{ email }, { username }] 
  });
  
  if (existingUser) {
    throw new ValidationError('User already exists');
  }
  
  const user = await User.create({ username, email, password });
  
  // Remove password from response
  user.password = undefined;
  
  res.status(201).json({
    success: true,
    data: user
  });
});

exports.getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, role } = req.query;
  
  const query = {};
  if (role) query.role = role;
  
  const users = await User.find(query)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .select('-password')
    .sort({ createdAt: -1 });
  
  const count = await User.countDocuments(query);
  
  res.json({
    success: true,
    data: users,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: count,
      pages: Math.ceil(count / limit)
    }
  });
});

exports.getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  
  if (!user) {
    throw new NotFoundError('User not found');
  }
  
  res.json({
    success: true,
    data: user
  });
});

exports.updateUser = asyncHandler(async (req, res) => {
  const { username, email, role } = req.body;
  
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { username, email, role },
    { new: true, runValidators: true }
  ).select('-password');
  
  if (!user) {
    throw new NotFoundError('User not found');
  }
  
  res.json({
    success: true,
    data: user
  });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  
  if (!user) {
    throw new NotFoundError('User not found');
  }
  
  res.json({
    success: true,
    message: 'User deleted successfully'
  });
});

// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;

// server.js
const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/users');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to database
connectDB();

app.use(express.json());

app.use('/api/users', userRoutes);

app.use(errorHandler);

app.listen(3000);
```

**Explanation:**
- Mongoose provides schema-based modeling for MongoDB
- Schemas define structure and validation rules
- Middleware hooks (pre/post) run before/after operations
- Models provide methods for CRUD operations
- `select('-password')` excludes sensitive fields from queries
- Pagination improves performance for large datasets

**Example Use Case:** Building a user management system with secure password storage, data validation, and efficient querying.

---

### Day 11: Authentication with JWT

**Topics Covered:**
- JWT fundamentals
- User registration and login
- Protecting routes
- Token refresh strategies

**Code Snippet:**
```javascript
// Install: npm install jsonwebtoken bcryptjs cookie-parser

// utils/jwt.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.generateToken = (payload) => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn
  });
};

exports.generateRefreshToken = (payload) => {
  return jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: '7d'
  });
};

exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (error) {
    throw new Error('Invalid token');
  }
};

// controllers/authController.js
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const { ValidationError, UnauthorizedError } = require('../utils/errors');
const { generateToken, generateRefreshToken } = require('../utils/jwt');

exports.register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  
  const existingUser = await User.findOne({ 
    $or: [{ email }, { username }] 
  });
  
  if (existingUser) {
    throw new ValidationError('User already exists');
  }
  
  const user = await User.create({ username, email, password });
  
  const token = generateToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id });
  
  // Store refresh token in database (implement this in User model)
  user.refreshToken = refreshToken;
  await user.save();
  
  res.status(201).json({
    success: true,
    data: {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      accessToken: token,
      refreshToken
    }
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    throw new ValidationError('Please provide email and password');
  }
  
  // Include password field for comparison
  const user = await User.findOne({ email }).select('+password');
  
  if (!user || !(await user.comparePassword(password))) {
    throw new UnauthorizedError('Invalid credentials');
  }
  
  if (!user.isActive) {
    throw new UnauthorizedError('Account is deactivated');
  }
  
  const token = generateToken({ id: user._id, role: user.role });
  const refreshToken = generateRefreshToken({ id: user._id });
  
  // Update refresh token
  user.refreshToken = refreshToken;
  user.lastLogin = Date.now();
  await user.save();
  
  // Set cookie (optional, for web apps)
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
  
  res.json({
    success: true,
    data: {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      accessToken: token
    }
  });
});

exports.logout = asyncHandler(async (req, res) => {
  // Clear refresh token from database
  await User.findByIdAndUpdate(req.user.id, { refreshToken: null });
  
  res.clearCookie('refreshToken');
  
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

exports.refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body || req.cookies;
  
  if (!refreshToken) {
    throw new UnauthorizedError('Refresh token required');
  }
  
  const decoded = jwt.verify(refreshToken, config.jwt.refreshSecret);
  const user = await User.findById(decoded.id);
  
  if (!user || user.refreshToken !== refreshToken) {
    throw new UnauthorizedError('Invalid refresh token');
  }
  
  const newToken = generateToken({ id: user._id, role: user.role });
  
  res.json({
    success: true,
    data: { accessToken: newToken }
  });
});

exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  
  res.json({
    success: true,
    data: user
  });
});

// middleware/auth.js
const { verifyToken } = require('../utils/jwt');
const { UnauthorizedError } = require('../utils/errors');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (!token) {
    throw new UnauthorizedError('Not authorized to access this route');
  }
  
  try {
    const decoded = verifyToken(token);
    req.user = await User.findById(decoded.id).select('-password');
    
    if (!req.user) {
      throw new UnauthorizedError('User no longer exists');
    }
    
    next();
  } catch (error) {
    throw new UnauthorizedError('Not authorized to access this route');
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError('You do not have permission to perform this action');
    }
    next();
  };
};

// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', protect, authController.logout);
router.post('/refresh-token', authController.refreshToken);
router.get('/profile', protect, authController.getProfile);

module.exports = router;
```

**Explanation:**
- JWT (JSON Web Tokens) provide stateless authentication
- Access tokens are short-lived (15min-1h), refresh tokens long-lived (7 days)
- Tokens contain user info (id, role) but no sensitive data
- `protect` middleware verifies token and attaches user to request
- `restrictTo` middleware checks user roles for authorization
- Refresh tokens allow getting new access tokens without re-login

**Example Use Case:** Building a secure API where users login once and receive a token to authenticate subsequent requests, with role-based access control.

---

### Day 12: Authorization & Role-Based Access Control

**Topics Covered:**
- Role-based middleware
- Permission systems
- Resource ownership verification
- Admin routes

**Key Code Snippets:**

```javascript
// middleware/auth.js - Authorization
exports.authorize = (...permissions) => {
  return async (req, res, next) => {
    const userPermissions = await getUserPermissions(req.user.id);
    const hasPermission = permissions.some(p => userPermissions.includes(p));
    
    if (!hasPermission) {
      throw new UnauthorizedError('Insufficient permissions');
    }
    next();
  };
};

exports.checkOwnership = (Model) => {
  return async (req, res, next) => {
    const resource = await Model.findById(req.params.id);
    
    if (!resource) {
      throw new NotFoundError('Resource not found');
    }
    
    if (resource.user.toString() !== req.user.id && req.user.role !== 'admin') {
      throw new UnauthorizedError('Not authorized to access this resource');
    }
    
    req.resource = resource;
    next();
  };
};

// Usage in routes
router.delete('/:id', 
  protect, 
  restrictTo('admin', 'moderator'), 
  userController.deleteUser
);

router.put('/posts/:id', 
  protect, 
  checkOwnership(Post), 
  postController.updatePost
);
```

**Explanation:**
- RBAC separates authentication (who you are) from authorization (what you can do)
- Roles: admin (full access), moderator (manage content), user (basic access)
- Resource ownership ensures users can only modify their own data
- Permission systems allow fine-grained control

---

### Day 13: File Upload Handling

**Topics Covered:**
- Using Multer for file uploads
- File validation and size limits
- Storing files locally vs cloud
- Image processing with Sharp

**Key Code Snippets:**

```javascript
// npm install multer sharp

// middleware/upload.js
const multer = require('multer');
const path = require('path');

// Disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Invalid file type. Only JPEG, PNG, GIF, PDF allowed'));
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: fileFilter
});

module.exports = upload;

// controllers/fileController.js
const sharp = require('sharp');

exports.uploadSingle = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ValidationError('Please upload a file');
  }
  
  res.json({
    success: true,
    file: {
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size
    }
  });
});

exports.uploadMultiple = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    throw new ValidationError('Please upload files');
  }
  
  res.json({
    success: true,
    files: req.files.map(f => ({
      filename: f.filename,
      path: f.path
    }))
  });
});

// Image processing
exports.processImage = asyncHandler(async (req, res) => {
  const processedPath = `uploads/processed-${req.file.filename}`;
  
  await sharp(req.file.path)
    .resize(800, 600, { fit: 'inside' })
    .jpeg({ quality: 90 })
    .toFile(processedPath);
  
  res.json({ success: true, path: processedPath });
});

// routes/files.js
router.post('/upload', protect, upload.single('image'), fileController.uploadSingle);
router.post('/upload-multiple', protect, upload.array('images', 5), fileController.uploadMultiple);
router.post('/upload-fields', protect, upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'gallery', maxCount: 5 }
]), fileController.uploadFields);
```

**Explanation:**
- Multer handles multipart/form-data for file uploads
- Disk storage saves files to server, memory storage keeps in RAM
- File validation prevents malicious uploads
- Sharp processes and optimizes images
- Cloud storage (S3, Cloudinary) recommended for production

---

### Day 14: API Documentation with Swagger

**Topics Covered:**
- Setting up Swagger/OpenAPI
- Documenting routes
- Request/response schemas
- Try-it-out feature

**Key Code Snippets:**

```javascript
// npm install swagger-jsdoc swagger-ui-express

// config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API Documentation',
      version: '1.0.0',
      description: 'Complete API documentation for Express.js application',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url: 'https://api.example.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./routes/*.js', './models/*.js']
};

module.exports = swaggerJsdoc(options);

// server.js
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes/users.js with JSDoc comments
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *       properties:
 *         id:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, admin, moderator]
 */
```

**Explanation:**
- Swagger provides interactive API documentation
- JSDoc comments above routes generate documentation automatically
- Users can test endpoints directly from the docs
- Schemas ensure consistent request/response formats

---

## Week 3: Advanced Concepts (Days 15-21)

### Day 15: Rate Limiting & Security Headers

**Topics Covered:**
- Express rate limit
- Helmet for security headers
- CORS configuration
- XSS and NoSQL injection prevention

**Key Code Snippets:**

```javascript
// npm install express-rate-limit helmet cors express-mongo-sanitize xss-clean

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');

// Security headers
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per windowMs
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', limiter);

// Stricter rate limit for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts, please try again later'
});
app.use('/api/auth/login', authLimiter);

// Data sanitization against NoSQL injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
const hpp = require('hpp');
app.use(hpp({
  whitelist: ['price', 'rating'] // Allow duplicates for these
}));
```

**Explanation:**
- Rate limiting prevents brute force and DoS attacks
- Helmet sets various HTTP headers for security
- CORS controls which domains can access your API
- Sanitization prevents injection attacks

---

### Day 16: Caching Strategies

**Topics Covered:**
- In-memory caching with node-cache
- Redis integration
- Cache invalidation
- HTTP caching headers

**Key Code Snippets:**

```javascript
// npm install node-cache redis

const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 600 }); // 10 minutes

// Simple cache middleware
const cache = (duration) => {
  return (req, res, next) => {
    const key = req.originalUrl;
    const cachedResponse = myCache.get(key);
    
    if (cachedResponse) {
      return res.json(cachedResponse);
    }
    
    res.originalJson = res.json;
    res.json = (body) => {
      myCache.set(key, body, duration);
      res.originalJson(body);
    };
    next();
  };
};

// Usage
router.get('/products', cache(300), productController.getAll);

// Redis integration
const redis = require('redis');
const client = redis.createClient({
  url: process.env.REDIS_URL
});

client.on('error', (err) => console.log('Redis Error:', err));
await client.connect();

// Redis cache middleware
const redisCache = (req, res, next) => {
  const key = req.originalUrl;
  
  client.get(key, (err, data) => {
    if (err) throw err;
    
    if (data) {
      return res.json(JSON.parse(data));
    }
    
    res.originalJson = res.json;
    res.json = (body) => {
      client.setEx(key, 600, JSON.stringify(body));
      res.originalJson(body);
    };
    next();
  });
};

// Cache invalidation
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body);
  
  // Invalidate cache
  myCache.del('/api/products');
  myCache.del(`/api/products/${req.params.id}`);
  
  res.json({ success: true, data: product });
});
```

---

### Day 17: WebSockets & Real-time Communication

**Topics Covered:**
- Socket.io integration
- Real-time events
- Authentication with sockets
- Room/namespace management

**Key Code Snippets:**

```javascript
// npm install socket.io

const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true
  }
});

// Socket authentication middleware
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    const decoded = verifyToken(token);
    socket.userId = decoded.id;
    next();
  } catch (error) {
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.userId);
  
  // Join user-specific room
  socket.join(`user:${socket.userId}`);
  
  // Chat example
  socket.on('send-message', async (data) => {
    const message = await Message.create({
      user: socket.userId,
      text: data.text,
      room: data.room
    });
    
    io.to(data.room).emit('new-message', message);
  });
  
  // Typing indicator
  socket.on('typing', (room) => {
    socket.to(room).emit('user-typing', socket.userId);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.userId);
  });
});

server.listen(3000);

// Express route to trigger socket event
exports.createNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.create(req.body);
  
  // Emit to specific user
  io.to(`user:${req.body.userId}`).emit('notification', notification);
  
  res.status(201).json({ success: true, data: notification });
});
```

---

### Day 18: Background Jobs & Task Scheduling

**Topics Covered:**
- Bull queue for job processing
- Cron jobs with node-cron
- Email sending with Nodemailer
- Task retries and error handling

**Key Code Snippets:**

```javascript
// npm install bull node-cron nodemailer

const Queue = require('bull');
const cron = require('node-cron');
const nodemailer = require('nodemailer');

// Email queue
const emailQueue = new Queue('email', process.env.REDIS_URL);

emailQueue.process(async (job) => {
  const { to, subject, html } = job.data;
  
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  
  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to,
    subject,
    html
  });
  
  return { sent: true };
});

// Add job to queue
exports.sendWelcomeEmail = async (user) => {
  await emailQueue.add({
    to: user.email,
    subject: 'Welcome!',
    html: `<h1>Welcome ${user.username}!</h1>`
  }, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000
    }
  });
};

// Image processing queue
const imageQueue = new Queue('image-processing', process.env.REDIS_URL);

imageQueue.process(async (job) => {
  const { imagePath, sizes } = job.data;
  
  for (const size of sizes) {
    await sharp(imagePath)
      .resize(size.width, size.height)
      .toFile(`${imagePath}-${size.name}.jpg`);
  }
});

// Cron job - daily cleanup
cron.schedule('0 0 * * *', async () => {
  console.log('Running daily cleanup...');
  await cleanupOldFiles();
  await deleteExpiredTokens();
});

// Cron job - every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  await checkPendingOrders();
});
```

---

### Day 19: Testing with Jest & Supertest

**Topics Covered:**
- Unit testing
- Integration testing
- API endpoint testing
- Mocking databases

**Key Code Snippets:**

```javascript
// npm install --save-dev jest supertest @shelf/jest-mongodb

// jest.config.js
module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/'],
  preset: '@shelf/jest-mongodb'
};

// tests/unit/user.test.js
const User = require('../../models/User');

describe('User Model', () => {
  it('should hash password before saving', async () => {
    const user = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    
    await user.save();
    expect(user.password).not.toBe('password123');
    expect(user.password.length).toBeGreaterThan(20);
  });
  
  it('should compare passwords correctly', async () => {
    const user = await User.create({
      username: 'testuser2',
      email: 'test2@example.com',
      password: 'password123'
    });
    
    const isMatch = await user.comparePassword('password123');
    expect(isMatch).toBe(true);
    
    const isNotMatch = await user.comparePassword('wrongpassword');
    expect(isNotMatch).toBe(false);
  });
});

// tests/integration/auth.test.js
const request = require('supertest');
const app = require('../../server');
const User = require('../../models/User');

describe('Auth Endpoints', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });
  
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'newuser',
          email: 'new@example.com',
          password: 'password123'
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.accessToken).toBeDefined();
    });
    
    it('should not register duplicate email', async () => {
      await User.create({
        username: 'existing',
        email: 'existing@example.com',
        password: 'password123'
      });
      
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'newuser',
          email: 'existing@example.com',
          password: 'password123'
        });
      
      expect(res.statusCode).toBe(400);
    });
  });
  
  describe('POST /api/auth/login', () => {
    it('should login existing user', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        });
      
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data.accessToken).toBeDefined();
    });
  });
  
  describe('GET /api/auth/profile', () => {
    it('should get user profile with valid token', async () => {
      const registerRes = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        });
      
      const token = registerRes.body.data.accessToken;
      
      const res = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data.email).toBe('test@example.com');
    });
    
    it('should reject without token', async () => {
      const res = await request(app).get('/api/auth/profile');
      expect(res.statusCode).toBe(401);
    });
  });
});

// package.json
{
  "scripts": {
    "test": "jest --watchAll --verbose",
    "test:coverage": "jest --coverage"
  }
}
```

---

### Day 20: Logging & Monitoring

**Topics Covered:**
- Winston logger setup
- Morgan for HTTP logging
- Error tracking
- Performance monitoring

**Key Code Snippets:**

```javascript
// npm install winston morgan

const winston = require('winston');
const morgan = require('morgan');

// winston logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log' 
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

// Morgan HTTP logging
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

// Log middleware
app.use((req, res, next) => {
  logger.info({
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
});

// Error logging
app.use((err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip
  });
  
  errorHandler(err, req, res, next);
});

// Performance monitoring
const responseTime = require('response-time');

app.use(responseTime((req, res, time) => {
  logger.info(`${req.method} ${req.url} - ${time}ms`);
}));
```

---

### Day 21: API Versioning & Deprecation

**Topics Covered:**
- URL versioning
- Header versioning
- Handling multiple versions
- Deprecation strategies

**Key Code Snippets:**

```javascript
// URL versioning (recommended)
app.use('/api/v1', require('./routes/v1'));
app.use('/api/v2', require('./routes/v2'));

// routes/v1/users.js
router.get('/', (req, res) => {
  res.json({ 
    version: '1.0',
    data: users 
  });
});

// routes/v2/users.js
router.get('/', (req, res) => {
  res.json({ 
    version: '2.0',
    data: users,
    meta: { total: users.length } // New in v2
  });
});

// Header versioning
app.use((req, res, next) => {
  const version = req.get('API-Version') || '1';
  req.apiVersion = version;
  next();
});

router.get('/users', (req, res) => {
  if (req.apiVersion === '2') {
    return res.json(getUsersV2());
  }
  res.json(getUsersV1());
});

// Deprecation warning
const deprecated = (message, sunsetDate) => {
  return (req, res, next) => {
    res.set('Deprecation', 'true');
    res.set('Sunset', sunsetDate);
    res.set('Link', '<https://api.example.com/v2/users>; rel="successor-version"');
    logger.warn(`Deprecated endpoint accessed: ${req.url}`);
    next();
  };
};

router.get('/old-endpoint', deprecated('Use /v2/users instead', '2025-12-31'), (req, res) => {
  res.json({ message: 'This endpoint is deprecated' });
});
```

---

## Week 4: Production & Advanced (Days 22-30)

### Day 22: Database Optimization & Indexing

**Topics Covered:**
- MongoDB indexing strategies
- Query optimization
- Aggregation pipelines
- Database connection pooling

**Key Code Snippets:**

```javascript
// models/User.js - Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ role: 1, isActive: 1 }); // Compound index

// Text search index
userSchema.index({ 
  username: 'text', 
  email: 'text', 
  bio: 'text' 
});

// Geospatial index
userSchema.index({ location: '2dsphere' });

// Query optimization
exports.getUsers = asyncHandler(async (req, res) => {
  // Bad: Loading all fields
  // const users = await User.find({});
  
  // Good: Select only needed fields
  const users = await User
    .find({ isActive: true })
    .select('username email role')
    .lean() // Returns plain JS objects (faster)
    .limit(20);
  
  res.json({ data: users });
});

// Aggregation pipeline
exports.getUserStats = asyncHandler(async (req, res) => {
  const stats = await User.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: '$role',
        count: { $sum: 1 },
        avgAge: { $avg: '$age' }
      }
    },
    { $sort: { count: -1 } }
  ]);
  
  res.json({ data: stats });
});

// Connection pooling
mongoose.connect(process.env.MONGODB_URI, {
  maxPoolSize: 10,
  minPoolSize: 2,
  serverSelectionTimeoutMS: 5000
});
```

---

### Day 23: Microservices Architecture Basics

**Topics Covered:**
- Service separation
- Inter-service communication
- API Gateway pattern
- Service discovery

**Key Concepts:**

```javascript
// Service structure
/auth-service
  - controllers/
  - models/
  - routes/
  - server.js

/product-service
  - controllers/
  - models/
  - routes/
  - server.js

/order-service
  - controllers/
  - models/
  - routes/
  - server.js

// API Gateway
const express = require('express');
const proxy = require('express-http-proxy');

const app = express();

// Route requests to appropriate services
app.use('/api/auth', proxy('http://localhost:3001'));
app.use('/api/products', proxy('http://localhost:3002'));
app.use('/api/orders', proxy('http://localhost:3003'));

// Inter-service communication
const axios = require('axios');

exports.createOrder = asyncHandler(async (req, res) => {
  // Call product service to check stock
  const productRes = await axios.get(
    `http://product-service:3002/api/products/${req.body.productId}`
  );
  
  if (productRes.data.stock < req.body.quantity) {
    throw new ValidationError('Insufficient stock');
  }
  
  // Create order
  const order = await Order.create(req.body);
  res.status(201).json({ success: true, data: order });
});
```

---

### Day 24: GraphQL with Express

**Topics Covered:**
- GraphQL basics
- Apollo Server integration
- Resolvers and schemas
- Queries and mutations

**Key Code Snippets:**

```javascript
// npm install apollo-server-express graphql

const { ApolloServer, gql } = require('apollo-server-express');

// Type definitions
const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
  }
  
  type Query {
    users: [User!]!
    user(id: ID!): User
  }
  
  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
    updateUser(id: ID!, username: String, email: String): User!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (_, { id }) => await User.findById(id)
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      return await User.create({ username, email, password });
    },
    updateUser: async (_, { id, ...updates }) => {
      return await User.findByIdAndUpdate(id, updates, { new: true });
    }
  }
};

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Add user from JWT token
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const user = verifyToken(token);
      return { user };
    }
    return {};
  }
});

await server.start();
server.applyMiddleware({ app, path: '/graphql' });
```

---

### Day 25: Containerization with Docker

**Topics Covered:**
- Creating Dockerfiles
- Docker Compose for multi-container apps
- Environment variables in containers
- Volume management

**Key Files:**

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]

# For development
# CMD ["npm", "run", "dev"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mongo
      - redis
    volumes:
      - ./:/app
      - /app/node_modules
    
  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db
    
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  mongo-data:

# Commands:
# docker-compose up -d
# docker-compose down
# docker-compose logs -f app
```

```dockerfile
# .dockerignore
node_modules
npm-debug.log
.env
.git
.gitignore
README.md
```

---

### Day 26: CI/CD Pipeline Setup

**Topics Covered:**
- GitHub Actions workflow
- Automated testing
- Docker image building
- Deployment automation

**Key Files:**

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:7
        ports:
          - 27017:27017
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run linter
        run: npm run lint
      
      - name: Run tests
        run: npm test
        env:
          MONGODB_URI: mongodb://localhost:27017/test
      
      - name: Generate coverage report
        run: npm run test:coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Build Docker image
        run: docker build -t myapp:${{ github.sha }} .
      
      - name: Push to registry
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push myapp:${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: Deploy to production
        run: |
          # SSH into server and pull new image
          echo "Deploying to production..."
```

---

### Day 27: Deployment to Production

**Topics Covered:**
- Deploying to VPS (DigitalOcean, AWS EC2)
- PM2 process manager
- Nginx reverse proxy
- SSL/TLS certificates

**Key Configurations:**

```javascript
// ecosystem.config.js (PM2)
module.exports = {
  apps: [{
    name: 'api',
    script: './server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    max_memory_restart: '500M'
  }]
};

// Commands:
// pm2 start ecosystem.config.js
// pm2 stop api
// pm2 restart api
// pm2 logs api
// pm2 monit
```

```nginx
# /etc/nginx/sites-available/api
server {
    listen 80;
    server_name api.example.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.example.com;
    
    # SSL certificates (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/api.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.example.com/privkey.pem;
    
    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # Proxy settings
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
    limit_req zone=api_limit burst=20 nodelay;
    
    # Static files cache
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}

# Enable site:
# sudo ln -s /etc/nginx/sites-available/api /etc/nginx/sites-enabled/
# sudo nginx -t
# sudo systemctl reload nginx

# SSL with Certbot:
# sudo certbot --nginx -d api.example.com
```

---

### Day 28: Performance Optimization

**Topics Covered:**
- Compression middleware
- Database query optimization
- Load balancing
- CDN integration

**Key Code Snippets:**

```javascript
// npm install compression

const compression = require('compression');

// Gzip compression
app.use(compression({
  level: 6,
  threshold: 1024, // Only compress responses > 1KB
  filter: (req, res) => {
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// Database connection optimization
mongoose.connect(process.env.MONGODB_URI, {
  maxPoolSize: 50,
  minPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4
});

// Query optimization with lean and select
const users = await User
  .find({ isActive: true })
  .select('username email')
  .lean()
  .cache(300); // Requires caching plugin

// Pagination with efficient counting
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 20;
const skip = (page - 1) * limit;

const [users, total] = await Promise.all([
  User.find().skip(skip).limit(limit).lean(),
  User.countDocuments()
]);

// Response streaming for large data
exports.exportUsers = asyncHandler(async (req, res) => {
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
  
  const cursor = User.find().cursor();
  
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    res.write(`${doc.username},${doc.email}\n`);
  }
  
  res.end();
});

// Load balancing with cluster
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const cpuCount = os.cpus().length;
  
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.id} died, starting new worker...`);
    cluster.fork();
  });
} else {
  // Worker process runs the app
  app.listen(3000);
}
```

---

### Day 29: Monitoring & Health Checks

**Topics Covered:**
- Health check endpoints
- Metrics collection
- APM integration
- Uptime monitoring

**Key Code Snippets:**

```javascript
// Health check endpoints
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

app.get('/health/detailed', asyncHandler(async (req, res) => {
  const health = {
    status: 'ok',
    timestamp: new Date(),
    uptime: process.uptime(),
    services: {}
  };
  
  // Check database
  try {
    await mongoose.connection.db.admin().ping();
    health.services.database = 'healthy';
  } catch (error) {
    health.services.database = 'unhealthy';
    health.status = 'degraded';
  }
  
  // Check Redis
  try {
    await redisClient.ping();
    health.services.redis = 'healthy';
  } catch (error) {
    health.services.redis = 'unhealthy';
    health.status = 'degraded';
  }
  
  const statusCode = health.status === 'ok' ? 200 : 503;
  res.status(statusCode).json(health);
}));

// Metrics endpoint
app.get('/metrics', (req, res) => {
  const metrics = {
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    uptime: process.uptime(),
    activeConnections: mongoose.connection.db.serverConfig.s.pool.size
  };
  
  res.json(metrics);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  
  server.close(async () => {
    console.log('HTTP server closed');
    
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    
    await redisClient.quit();
    console.log('Redis connection closed');
    
    process.exit(0);
  });
  
  setTimeout(() => {
    console.error('Forcefully shutting down');
    process.exit(1);
  }, 10000);
});
```

---

### Day 30: Best Practices & Production Checklist

**Final Best Practices:**

**1. Security Checklist:**
- ✅ Use HTTPS only
- ✅ Implement rate limiting
- ✅ Validate all inputs
- ✅ Sanitize data (prevent injection)
- ✅ Use security headers (Helmet)
- ✅ Keep dependencies updated
- ✅ Use environment variables for secrets
- ✅ Implement CSRF protection for cookies
- ✅ Use secure session management
- ✅ Enable CORS selectively

**2. Performance Checklist:**
- ✅ Enable compression
- ✅ Implement caching (Redis)
- ✅ Optimize database queries
- ✅ Use connection pooling
- ✅ Implement pagination
- ✅ Use CDN for static assets
- ✅ Enable HTTP/2
- ✅ Monitor response times
- ✅ Use clustering for CPU-intensive tasks

**3. Code Quality:**
- ✅ Follow consistent coding style (ESLint)
- ✅ Write unit and integration tests
- ✅ Document API (Swagger)
- ✅ Use TypeScript (optional but recommended)
- ✅ Implement proper error handling
- ✅ Use async/await consistently
- ✅ Keep controllers thin, logic in services
- ✅ Follow RESTful conventions

**4. Monitoring & Logging:**
- ✅ Implement structured logging
- ✅ Set up error tracking (Sentry)
- ✅ Monitor performance (New Relic, DataDog)
- ✅ Set up uptime monitoring
- ✅ Create health check endpoints
- ✅ Track business metrics
- ✅ Set up alerts for critical errors

**5. Deployment:**
- ✅ Use environment-specific configs
- ✅ Implement CI/CD pipeline
- ✅ Use process manager (PM2)
- ✅ Set up reverse proxy (Nginx)
- ✅ Enable SSL/TLS
- ✅ Configure firewall
- ✅ Set up automated backups
- ✅ Implement rolling deployments

**Complete Project Structure:**
```
express-api/
├── src/
│   ├── config/
│   │   ├── database.js
│   │   ├── swagger.js
│   │   └── config.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   ├── validate.js
│   │   └── upload.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   ├── v1/
│   │   │   ├── auth.js
│   │   │   └── users.js
│   │   └── index.js
│   ├── services/
│   │   ├── emailService.js
│   │   └── authService.js
│   ├── utils/
│   │   ├── jwt.js
│   │   ├── errors.js
│   │   ├── asyncHandler.js
│   │   └── logger.js
│   └── server.js
├── tests/
│   ├── unit/
│   └── integration/
├── logs/
├── uploads/
├── .env
├── .env.example
├── .gitignore
├── .dockerignore
├── Dockerfile
├── docker-compose.yml
├── ecosystem.config.js
├── jest.config.js
├── package.json
└── README.md
```

---

## Bonus Resources

**Recommended Reading:**
- Express.js Official Documentation
- MDN Web Docs - HTTP
- OWASP API Security Top 10
- Node.js Best Practices by Goldbergyoni

**Tools & Libraries:**
- VS Code Extensions: ESLint, Prettier, REST Client
- API Testing: Postman, Insomnia, Thunder Client
- Database: MongoDB Compass, Studio 3T
- Monitoring: PM2 Dashboard, Grafana

**Next Steps:**
1. Build a complete project using all concepts
2. Deploy to production
3. Learn TypeScript for type safety
4. Explore serverless with Express (AWS Lambda)
5. Study GraphQL as REST alternative
6. Learn Kubernetes for container orchestration

---

🎉 **Congratulations!** You've completed the 30-day Express.js course. You now have the knowledge to build production-ready APIs from scratch!

### Day 12: Authorization & Role-Based Access Control

**Topics Covered:**
- Role-based middleware
- Permission systems
- Resource ownership verification
- Admin routes

**Key Code Snippets:**

```javascript
// middleware/auth.js - Authorization
exports.authorize = (...permissions) => {
  return async (req, res, next) => {
    const userPermissions = await getUserPermissions(req.user.id);
    const hasPermission = permissions.some(p => userPermissions.includes(p));
    
    if (!hasPermission) {
      throw new UnauthorizedError('Insufficient permissions');
    }
    next();
  };
};

exports.checkOwnership = (Model) => {
  return async (req, res, next) => {
    const resource = await Model.findById(req.params.id);
    
    if (!resource) {
      throw new NotFoundError('Resource not found');
    }
    
    if (resource.user.toString() !== req.user.id && req.user.role !== 'admin') {
      throw new UnauthorizedError('Not authorized to access this resource');
    }
    
    req.resource = resource;
    next();
  };
};

// Usage in routes
router.delete('/:id', 
  protect, 
  restrictTo('admin', 'moderator'), 
  userController.deleteUser
);

router.put('/posts/:id', 
  protect, 
  checkOwnership(Post), 
  postController.updatePost
);
```

**Explanation:**
- RBAC separates authentication (who you are) from authorization (what you can do)
- Roles: admin (full access), moderator (manage content), user (basic access)
- Resource ownership ensures users can only modify their own data
- Permission systems allow fine-grained control

---

### Day 13: File Upload Handling

**Topics Covered:**
- Using Multer for file uploads
- File validation and size limits
- Storing files locally vs cloud
- Image processing with Sharp

**Key Code Snippets:**

```javascript
// npm install multer sharp

// middleware/upload.js
const multer = require('multer');
const path = require('path');

// Disk storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Invalid file type. Only JPEG, PNG, GIF, PDF allowed'));
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: fileFilter
});

module.exports = upload;

// controllers/fileController.js
const sharp = require('sharp');

exports.uploadSingle = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ValidationError('Please upload a file');
  }
  
  res.json({
    success: true,
    file: {
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size
    }
  });
});

exports.uploadMultiple = asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    throw new ValidationError('Please upload files');
  }
  
  res.json({
    success: true,
    files: req.files.map(f => ({
      filename: f.filename,
      path: f.path
    }))
  });
});

// Image processing
exports.processImage = asyncHandler(async (req, res) => {
  const processedPath = `uploads/processed-${req.file.filename}`;
  
  await sharp(req.file.path)
    .resize(800, 600, { fit: 'inside' })
    .jpeg({ quality: 90 })
    .toFile(processedPath);
  
  res.json({ success: true, path: processedPath });
});

// routes/files.js
router.post('/upload', protect, upload.single('image'), fileController.uploadSingle);
router.post('/upload-multiple', protect, upload.array('images', 5), fileController.uploadMultiple);
router.post('/upload-fields', protect, upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'gallery', maxCount: 5 }
]), fileController.uploadFields);
```

**Explanation:**
- Multer handles multipart/form-data for file uploads
- Disk storage saves files to server, memory storage keeps in RAM
- File validation prevents malicious uploads
- Sharp processes and optimizes images
- Cloud storage (S3, Cloudinary) recommended for production

---

### Day 14: API Documentation with Swagger

**Topics Covered:**
- Setting up Swagger/OpenAPI
- Documenting routes
- Request/response schemas
- Try-it-out feature

**Key Code Snippets:**

```javascript
// npm install swagger-jsdoc swagger-ui-express

// config/swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Express API Documentation',
      version: '1.0.0',
      description: 'Complete API documentation for Express.js application',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url: 'https://api.example.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./routes/*.js', './models/*.js']
};

module.exports = swaggerJsdoc(options);

// server.js
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes/users.js with JSDoc comments
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *       properties:
 *         id:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, admin, moderator]
 */
```

**Explanation:**
- Swagger provides interactive API documentation
- JSDoc comments above routes generate documentation automatically
- Users can test endpoints directly from the docs
- Schemas ensure consistent request/response formats

---

## Week 3: Advanced Concepts (Days 15-21)

### Day 15: Rate Limiting & Security Headers

**Topics Covered:**
- Express rate limit
- Helmet for security headers
- CORS configuration
- XSS and NoSQL injection prevention

**Key Code Snippets:**

```javascript
// npm install express-rate-limit helmet cors express-mongo-sanitize xss-clean

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');

// Security headers
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per windowMs
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', limiter);

// Stricter rate limit for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts, please try again later'
});
app.use('/api/auth/login', authLimiter);

// Data sanitization against NoSQL injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
const hpp = require('hpp');
app.use(hpp({
  whitelist: ['price', 'rating'] // Allow duplicates for these
}));
```

**Explanation:**
- Rate limiting prevents brute force and DoS attacks
- Helmet sets various HTTP headers for security
- CORS controls which domains can access your API
- Sanitization prevents injection attacks

---

### Day 16: Caching Strategies

**Topics Covered:**
- In-memory caching with node-cache
- Redis integration
- Cache invalidation
- HTTP caching headers

**Key Code Snippets:**

```javascript
// npm install node-cache redis

const NodeCache = require('node-cache');
const myCache = new NodeCache({ stdTTL: 600 }); // 10 minutes

// Simple cache middleware
const cache = (duration) => {
  return (req, res, next) => {
    const key = req.originalUrl;
    const cachedResponse = myCache.get(key);
    
    if (cachedResponse) {
      return res.json(cachedResponse);
    }
    
    res.originalJson = res.json;
    res.json = (body) => {
      myCache.set(key, body, duration);
      res.originalJson(body);
    };
    next();
  };
};

// Usage
router.get('/products', cache(300), productController.getAll);

// Redis integration
const redis = require('redis');
const client = redis.createClient({
  url: process.env.REDIS_URL
});

client.on('error', (err) => console.log('Redis Error:', err));
await client.connect();

// Redis cache middleware
const redisCache = (req, res, next) => {
  const key = req.originalUrl;
  
  client.get(key, (err, data) => {
    if (err) throw err;
    
    if (data) {
      return res.json(JSON.parse(data));
    }
    
    res.originalJson = res.json;
    res.json = (body) => {
      client.setEx(key, 600, JSON.stringify(body));
      res.originalJson(body);
    };
    next();
  });
};

// Cache invalidation
exports.updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body);
  
  // Invalidate cache
  myCache.del('/api/products');
  myCache.del(`/api/products/${req.params.id}`);
  
  res.json({ success: true, data: product });
});
```

---

### Day 17: WebSockets & Real-time Communication

**Topics Covered:**
- Socket.io integration
- Real-time events
- Authentication with sockets
- Room/namespace management

**Key Code Snippets:**

```javascript
// npm install socket.io

const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true
  }
});

// Socket authentication middleware
io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    const decoded = verifyToken(token);
    socket.userId = decoded.id;
    next();
  } catch (error) {
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.userId);
  
  // Join user-specific room
  socket.join(`user:${socket.userId}`);
  
  // Chat example
  socket.on('send-message', async (data) => {
    const message = await Message.create({
      user: socket.userId,
      text: data.text,
      room: data.room
    });
    
    io.to(data.room).emit('new-message', message);
  });
  
  // Typing indicator
  socket.on('typing', (room) => {
    socket.to(room).emit('user-typing', socket.userId);
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.userId);
  });
});

server.listen(3000);

// Express route to trigger socket event
exports.createNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.create(req.body);
  
  // Emit to specific user
  io.to(`user:${req.body.userId}`).emit('notification', notification);
  
  res.status(201).json({ success: true, data: notification });
});
```

---

### Day 18: Background Jobs & Task Scheduling

**Topics Covered:**
- Bull queue for job processing
- Cron jobs with node-cron
- Email sending with Nodemailer
- Task retries and error handling

**Key Code Snippets:**

```javascript
// npm install bull node-cron nodemailer

const Queue = require('bull');
const cron = require('node-cron');
const nodemailer = require('nodemailer');

// Email queue
const emailQueue = new Queue('email', process.env.REDIS_URL);

emailQueue.process(async (job) => {
  const { to, subject, html } = job.data;
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  
  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to,
    subject,
    html
  });
  
  return { sent: true };
});

// Add job to queue
exports.sendWelcomeEmail = async (user) => {
  await emailQueue.add({
    to: user.email,
    subject: 'Welcome!',
    html: `<h1>Welcome ${user.username}!</h1>`
  }, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 2000
    }
  });
};

// Image processing queue
const imageQueue = new Queue('image-processing', process.env.REDIS_URL);

imageQueue.process(async (job) => {
  const { imagePath, sizes } = job.data;
  
  for (const size of sizes) {
    await sharp(imagePath)
      .resize(size.width, size.height)
      .toFile(`${imagePath}-${size.name}.jpg`);
  }
});

// Cron job - daily cleanup
cron.schedule('0 0 * * *', async () => {
  console.log('Running daily cleanup...');
  await cleanupOldFiles();
  await deleteExpiredTokens();
});

// Cron job - every 5 minutes
cron.schedule('*/5 * * * *', async () => {
  await checkPendingOrders();
});
```

---

### Day 19: Testing with Jest & Supertest

**Topics Covered:**
- Unit testing
- Integration testing
- API endpoint testing
- Mocking databases

**Key Code Snippets:**

```javascript
// npm install --save-dev jest supertest @shelf/jest-mongodb

// jest.config.js
module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/'],
  preset: '@shelf/jest-mongodb'
};

// tests/unit/user.test.js
const User = require('../../models/User');

describe('User Model', () => {
  it('should hash password before saving', async () => {
    const user = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });
    
    await user.save();
    expect(user.password).not.toBe('password123');
    expect(user.password.length).toBeGreaterThan(20);
  });
  
  it('should compare passwords correctly', async () => {
    const user = await User.create({
      username: 'testuser2',
      email: 'test2@example.com',
      password: 'password123'
    });
    
    const isMatch = await user.comparePassword('password123');
    expect(isMatch).toBe(true);
    
    const isNotMatch = await user.comparePassword('wrongpassword');
    expect(isNotMatch).toBe(false);
  });
});

// tests/integration/auth.test.js
const request = require('supertest');
const app = require('../../server');
const User = require('../../models/User');

describe('Auth Endpoints', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });
  
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'newuser',
          email: 'new@example.com',
          password: 'password123'
        });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.accessToken).toBeDefined();
    });
    
    it('should not register duplicate email', async () => {
      await User.create({
        username: 'existing',
        email: 'existing@example.com',
        password: 'password123'
      });
      
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'newuser',
          email: 'existing@example.com',
          password: 'password123'
        });
      
      expect(res.statusCode).toBe(400);
    });
  });
  
  describe('POST /api/auth/login', () => {
    it('should login existing user', async () => {
      await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        });
      
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data.accessToken).toBeDefined();
    });
  });
  
  describe('GET /api/auth/profile', () => {
    it('should get user profile with valid token', async () => {
      const registerRes = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password123'
        });
      
      const token = registerRes.body.data.accessToken;
      
      const res = await request(app)
        .get('/api/auth/profile')
        .set('Authorization', `Bearer ${token}`);
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data.email).toBe('test@example.com');
    });
    
    it('should reject without token', async () => {
      const res = await request(app).get('/api/auth/profile');
      expect(res.statusCode).toBe(401);
    });
  });
});

// package.json
{
  "scripts": {
    "test": "jest --watchAll --verbose",
    "test:coverage": "jest --coverage"
  }
}
```

---

### Day 20: Logging & Monitoring

**Topics Covered:**
- Winston logger setup
- Morgan for HTTP logging
- Error tracking
- Performance monitoring

**Key Code Snippets:**

```javascript
// npm install winston morgan

const winston = require('winston');
const morgan = require('morgan');

// winston logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ 
      filename: 'logs/error.log', 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: 'logs/combined.log' 
    })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

// Morgan HTTP logging
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));

// Log middleware
app.use((req, res, next) => {
  logger.info({
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
});

// Error logging
app.use((err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip
  });
  
  errorHandler(err, req, res, next);
});

// Performance monitoring
const responseTime = require('response-time');

app.use(responseTime((req, res, time) => {
  logger.info(`${req.method} ${req.url} - ${time}ms`);
}));
```

---

### Day 21: API Versioning & Deprecation

**Topics Covered:**
- URL versioning
- Header versioning
- Handling multiple versions
- Deprecation strategies

**Key Code Snippets:**

```javascript
// URL versioning (recommended)
app.use('/api/v1', require('./routes/v1'));
app.use('/api/v2', require('./routes/v2'));

// routes/v1/users.js
router.get('/', (req, res) => {
  res.json({ 
    version: '1.0',
    data: users 
  });
});

// routes/v2/users.js
router.get('/', (req, res) => {
  res.json({ 
    version: '2.0',
    data: users,
    meta: { total: users.length } // New in v2
  });
});

// Header versioning
app.use((req, res, next) => {
  const version = req.get('API-Version') || '1';
  req.apiVersion = version;
  next();
});

router.get('/users', (req, res) => {
  if (req.apiVersion === '2') {
    return res.json(getUsersV2());
  }
  res.json(getUsersV1());
});

// Deprecation warning
const deprecated = (message, sunsetDate) => {
  return (req, res, next) => {
    res.set('Deprecation', 'true');
    res.set('Sunset', sunsetDate);
    res.set('Link', '<https://api.example.com/v2/users>; rel="successor-version"');
    logger.warn(`Deprecated endpoint accessed: ${req.url}`);
    next();
  };
};

router.get('/old-endpoint', deprecated('Use /v2/users instead', '2025-12-31'), (req, res) => {
  res.json({ message: 'This endpoint is deprecated' });
});
```

---

## Week 4: Production & Advanced (Days 22-30)

### Day 22: Database Optimization & Indexing

**Topics Covered:**
- MongoDB indexing strategies
- Query optimization
- Aggregation pipelines
- Database connection pooling

**Key Code Snippets:**

```javascript
// models/User.js - Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ role: 1, isActive: 1 }); // Compound index

// Text search index
userSchema.index({ 
  username: 'text', 
  email: 'text', 
  bio: 'text' 
});

// Geospatial index
userSchema.index({ location: '2dsphere' });

// Query optimization
exports.getUsers = asyncHandler(async (req, res) => {
  // Bad: Loading all fields
  // const users = await User.find({});
  
  // Good: Select only needed fields
  const users = await User
    .find({ isActive: true })
    .select('username email role')
    .lean() // Returns plain JS objects (faster)
    .limit(20);
  
  res.json({ data: users });
});

// Aggregation pipeline
exports.getUserStats = asyncHandler(async (req, res) => {
  const stats = await User.aggregate([
    { $match: { isActive: true } },
    {
      $group: {
        _id: '$role',
        count: { $sum: 1 },
        avgAge: { $avg: '$age' }
      }
    },
    { $sort: { count: -1 } }
  ]);
  
  res.json({ data: stats });
});

// Connection pooling
mongoose.connect(process.env.MONGODB_URI, {
  maxPoolSize: 10,
  minPoolSize: 2,
  serverSelectionTimeoutMS: 5000
});
```

---

### Day 23: Microservices Architecture Basics

**Topics Covered:**
- Service separation
- Inter-service communication
- API Gateway pattern
- Service discovery

**Key Concepts:**

```javascript
// Service structure
/auth-service
  - controllers/
  - models/
  - routes/
  - server.js

/product-service
  - controllers/
  - models/
  - routes/
  - server.js

/order-service
  - controllers/
  - models/
  - routes/
  - server.js

// API Gateway
const express = require('express');
const proxy = require('express-http-proxy');

const app = express();

// Route requests to appropriate services
app.use('/api/auth', proxy('http://localhost:3001'));
app.use('/api/products', proxy('http://localhost:3002'));
app.use('/api/orders', proxy('http://localhost:3003'));

// Inter-service communication
const axios = require('axios');

exports.createOrder = asyncHandler(async (req, res) => {
  // Call product service to check stock
  const productRes = await axios.get(
    `http://product-service:3002/api/products/${req.body.productId}`
  );
  
  if (productRes.data.stock < req.body.quantity) {
    throw new ValidationError('Insufficient stock');
  }
  
  // Create order
  const order
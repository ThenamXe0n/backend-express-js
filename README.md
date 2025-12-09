# **Node.js & Express.js Backend Notes (2025 Industry Standard)**

Clean, readable, structured, and production-ready.

---

## **1. Introduction to Node.js**

Node.js is a JavaScript runtime built on Google’s V8 engine.

### ✅ Key Features

- Event-driven architecture  
- Non-blocking I/O  
- Super fast for I/O heavy apps  
- Cross-platform  
- Huge npm ecosystem  

### Why Node.js for Backend?

- Same language on frontend & backend (JavaScript)  
- Great for microservices & APIs  
- Handles many concurrent connections (chat apps, real-time apps, etc.)

---

## **2. Introduction to Express.js**

Express.js is a minimal, flexible web framework for Node.js.

### ⭐ Features

- Middleware-based  
- Simple & powerful routing  
- Easy integration with DBs, auth, templating engines  
- Perfect for REST APIs  

### 🚀 Basic Express Server

```js
const express = require("express");
const app = express();

// Built-in middleware
app.use(express.json()); // parse JSON body

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
3. Project Structure (Industry Standard – 2025)
txt
Copy code
project/
 ├── src/
 │    ├── config/        # DB config, env config, etc.
 │    ├── controllers/   # Route handlers (business logic entry)
 │    ├── middleware/    # Custom middlewares
 │    ├── models/        # DB models (Mongoose/Prisma/Sequelize)
 │    ├── routes/        # Route definitions
 │    ├── services/      # Heavy business logic / external API calls
 │    ├── utils/         # Helper functions
 │    └── app.js         # Express app setup
 ├── .env                # Environment variables
 ├── server.js           # Server bootstrap (http.createServer etc.)
 ├── package.json
 └── README.md
Suggestion: Keep controllers thin, move complex logic to services/.

4. Server Bootstrap + app.set / app.get / Global Settings
app.set and app.get are used to store/read global settings in Express.

src/app.js
js
Copy code
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const userRoutes = require("./routes/user.routes");

const app = express();

// ------- Global Settings using app.set -------
app.set("port", process.env.PORT || 5000);
app.set("env", process.env.NODE_ENV || "development");
app.set("appName", "MyAwesomeAPI");

// ------- Built-in Middlewares -------
app.use(express.json()); // parse JSON
app.use(express.urlencoded({ extended: true })); // parse URL-encoded data
app.use(express.static("public")); // serve static files (images, css)

// ------- Third-party Middlewares -------
app.use(morgan("dev"));
app.use(cors());
app.use(helmet());

// ------- Custom Middleware (global) -------
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ------- Routes -------
app.use("/api/v1/users", userRoutes);

// ------- Error Handler (should be last) -------
app.use((err, req, res, next) => {
  console.error("ERROR:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
server.js
js
Copy code
require("dotenv").config();
const http = require("http");
const app = require("./src/app");

const PORT = app.get("port"); // getting value from app.set

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`${app.get("appName")} running on port ${PORT}`);
});
5. Global Variables using app.locals & res.locals
app.locals → global variables available in all views/requests

res.locals → variables available for a single response/chain

js
Copy code
// In app.js
app.locals.appVersion = "1.0.0";
app.locals.companyName = "MyCompany";

// In any middleware / controller
app.use((req, res, next) => {
  res.locals.requestTime = new Date().toISOString();
  next();
});
6. Routing in Express.js
Basic CRUD Routes
js
Copy code
// src/routes/user.routes.js
const router = require("express").Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.getAllUsers);      // GET /api/v1/users
router.post("/", userController.createUser);      // POST /api/v1/users
router.get("/:id", userController.getUserById);   // GET /api/v1/users/:id
router.put("/:id", userController.updateUser);    // PUT /api/v1/users/:id
router.delete("/:id", userController.deleteUser); // DELETE /api/v1/users/:id

module.exports = router;
7. Controllers
js
Copy code
// src/controllers/user.controller.js
const UserService = require("../services/user.service");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await UserService.findAll();
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = await UserService.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};
8. Services (Business Logic Layer)
js
Copy code
// src/services/user.service.js
const User = require("../models/user.model");

exports.findAll = () => {
  return User.find();
};

exports.create = (payload) => {
  const user = new User(payload);
  return user.save();
};
9. Middleware in Express (Built-in, Third-Party, Custom)
9.1 Built-in Middlewares
express.json() → parse JSON body

express.urlencoded() → parse form data

express.static() → serve static files

js
Copy code
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
9.2 Custom Middleware (global)
js
Copy code
// src/middleware/requestLogger.js
module.exports = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
};
Use:

js
Copy code
const requestLogger = require("./middleware/requestLogger");
app.use(requestLogger);
9.3 Route-Level Middleware
js
Copy code
const auth = require("../middleware/auth");

router.get("/profile", auth, userController.getProfile);
9.4 Error-Handling Middleware
js
Copy code
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});
10. MongoDB with Mongoose
Connection
js
Copy code
// src/config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected ✅");
  } catch (err) {
    console.error("MongoDB connection failed ❌", err);
    process.exit(1);
  }
};

module.exports = connectDB;
Call it in server.js:

js
Copy code
const connectDB = require("./src/config/db");
connectDB();
Model
js
Copy code
// src/models/user.model.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },
  },
  { timestamps: true }
);

// Pre-save hook for hashing password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
11. JavaScript Getters & Setters (Useful for Models / Config)
Getters & setters give you controlled access to object properties.

js
Copy code
class UserProfile {
  constructor(name, age) {
    this._name = name;
    this._age = age;
  }

  // Getter
  get name() {
    return this._name.toUpperCase();
  }

  // Setter
  set name(value) {
    if (!value) throw new Error("Name cannot be empty");
    this._name = value;
  }

  get age() {
    return this._age;
  }

  set age(value) {
    if (value < 0) throw new Error("Age cannot be negative");
    this._age = value;
  }
}

const user = new UserProfile("ravi", 22);
console.log(user.name); // "RAVI"
user.name = "Rahul";
You can also use getters/setters inside Mongoose virtuals or config classes.

12. JWT Authentication (Token Based Auth)
Generate Token (Helper Function)
js
Copy code
// src/utils/generateToken.js
const jwt = require("jsonwebtoken");

module.exports = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
Auth Middleware
js
Copy code
// src/middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id: ... }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
13. Validation (express-validator / Joi / Zod)
express-validator Example
js
Copy code
// src/routes/auth.routes.js
const router = require("express").Router();
const { body } = require("express-validator");
const authController = require("../controllers/auth.controller");
const validate = require("../middleware/validate");

router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validate, // custom middleware to handle validation result
  authController.register
);

module.exports = router;
js
Copy code
// src/middleware/validate.js
const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};
14. File Upload with Multer
js
Copy code
// src/config/multer.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/jpg"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Invalid file type"), false);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
js
Copy code
// route usage
const upload = require("../config/multer");

router.post("/avatar", upload.single("avatar"), (req, res) => {
  res.json({ success: true, file: req.file });
});
15. Helper Functions (utils) – Reusable Logic
In real projects we create many small helper functions.

Example Helpers
js
Copy code
// src/utils/response.js
exports.success = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({ success: true, data });
};

exports.error = (res, message, statusCode = 500) => {
  return res.status(statusCode).json({ success: false, message });
};
js
Copy code
// src/utils/paginate.js
exports.paginate = (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return { skip, limit: Number(limit) };
};
Usage in controller:

js
Copy code
const { paginate } = require("../utils/paginate");

exports.list = async (req, res, next) => {
  try {
    const { skip, limit } = paginate(req.query.page, req.query.limit);
    const users = await User.find().skip(skip).limit(limit);
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};
16. Security Best Practices (2025)
Install common security libs:

bash
Copy code
npm i helmet cors express-rate-limit xss-clean hpp
Use them:

js
Copy code
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const hpp = require("hpp");

app.use(helmet());
app.use(cors());
app.use(xss());             // prevent XSS
app.use(hpp());             // prevent HTTP parameter pollution

// Rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // max 100 requests / 15 mins
});

app.use("/api", limiter);
17. Logging (morgan + winston)
js
Copy code
const morgan = require("morgan");
const winston = require("winston");

app.use(morgan("dev"));

const logger = winston.createLogger({
  level: "info",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/app.log" }),
  ],
});

module.exports = logger;
Use logger:

js
Copy code
logger.info("Server started");
logger.error("Something went wrong");
18. Common / “Mandatory” Backend Libraries (Node + Express)
Obviously “mandatory” depends on project, but ye sab bahut common hain:

Core & Config
dotenv → load .env

cors → enable cross-origin requests

helmet → secure HTTP headers

morgan / winston → logging

Database
mongoose → MongoDB ODM

OR prisma / sequelize → SQL / multi-DB

Auth & Security
jsonwebtoken → JWT tokens

bcrypt / bcryptjs → password hashing

cookie-parser → read cookies

express-rate-limit, xss-clean, hpp → extra protection

Validation
express-validator OR joi OR zod

File Upload
multer

Others (based on needs)
compression → gzip responses

uuid / nanoid → unique IDs

nodemailer → send emails

redis client (ioredis, redis) → caching

socket.io → real-time communication

19. Environment Variables (.env)
.env file:

env
Copy code
PORT=5000
NODE_ENV=development
MONGO_URL=mongodb+srv://...
JWT_SECRET=supersecretkey
Load in code:

js
Copy code
require("dotenv").config();
20. Simple Architecture Flow (Text Diagram)
txt
Copy code
Client (React / Mobile / etc.)
          ↓
      Express Routes
          ↓
      Controllers
          ↓
        Services
          ↓
      Models / DB
          ↓
        Response

const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const router = express.Router();
const JWT_SECRET = 'jai-mata-di';
const nodemailer = require('nodemailer');
var fetchuser = require('../middleware/fetchuser');
require("dotenv").config();


// ROUTE 1: Authenticate a User using: POST "/api/auth/signup".
router.post('/signup', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Return validation errors with status code
    }
    try {
        // Checking whether a user with the provided email is already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return await res.status(400).json({ message: "Sorry, a user with this email already exists" }); // No status code, only error message
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            username: req.body.username,
            password: secPass,
            email: req.body.email,
        });

        const data = { user: { id: user.id, username: user.username } };
        const authtoken = jwt.sign(data, JWT_SECRET);

        res.status(200).json({ userId: user.id, username: user.username, authtoken: authtoken });
        console.log(user.id,user)

    } catch (error) {
        console.error(error.message);
        res.json({ error: "Some error occurred", message: error.message });
      }});

// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
router.post('/signin', [ 
    body('email', 'Enter a valid email').isEmail(), 
    body('password', 'Password cannot be blank').exists(), 
], async (req, res) => {
    // ... (validation errors ka code waisa hi rahega)

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const data = { 
            user: { 
                id: user.id, 
                username: user.username,
                role: user.role 
            } 
        };
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ 
            authtoken, 
            userId: user.id, 
            username: user.username, 
            role: user.role,
            message: "Login successful!" 
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An internal server error occurred", message: error.message });
    }
});

// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.get('/user/getUser', fetchuser, async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select('-password'); // Adjust as needed
      if (!user) {
          return res.status(404).send({ error: "User not found" });
      }
      res.json({ username: user.username });
  } catch (error) {
      res.status(500).send({ error: "Server error" });
  }
});

router.get('/getAllUsers', fetchuser, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);

    if (!currentUser) {
      return res.status(404).json({ error: "Current user not found" });
    }

    const users = await User.find({ _id: { $ne: req.user.id } }).select('-password');

    const updatedUsers = users.map(user => ({
      ...user.toObject(),
      followed: currentUser.following.includes(user._id.toString()),
    }));

    res.status(200).json(updatedUsers);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});


// ROUTE 4: POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "No user found with this email" });
        }

        const secret = JWT_SECRET + user.password;
        const token = jwt.sign({ email: user.email, id: user._id }, secret, {
        expiresIn: "5m",});

        const link = `http://localhost:5173/reset-password/${user._id}/${token}`;

        var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },});

        var mailOptions = {
            from: "ayushsidhuu@gmail.com",
            to: "ayushji456789@gmail.com",
            subject: "Password Reset",
            text: link,
          };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
        console.log(link);
    } catch (error) {}
});

// ROUTE 5: GET /api/auth/reset-password/:id/:token
router.get("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    console.log(req.params);
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
      res.render("index", { email: verify.email, status: "Not Verified" });
    } catch (error) {
      console.log(error);
      res.send("Not Verified");
    }
  });

// ROUTE 6: POST /api/auth/reset-password/:id/:token
router.post("/reset-password/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
  
    const oldUser = await User.findOne({ _id: id });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    try {
      const verify = jwt.verify(token, secret);
      const encryptedPassword = await bcrypt.hash(password, 10);
      await User.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            password: encryptedPassword,
          },
        }
      );

      res.render("index", { email: verify.email, status: "verified" });
    } catch (error) {
      console.log(error);
      res.json({ status: "Something Went Wrong" });
    }
  });

module.exports = router;


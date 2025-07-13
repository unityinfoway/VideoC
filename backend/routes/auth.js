const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Yeh sahi haiconst User = require('../models/User');
const sendWelcomeEmail = require('../utils/sendEmail');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User'); // Ensure this line is correct

// ... /signup and /register routes remain the same ...

// @route   POST api/auth/signup
// @desc    Register a basic user, create token, and auto-login
// @access  Public
router.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            isPlanActive: false,
        });
        const savedUser = await newUser.save();
        await sendWelcomeEmail(savedUser.email, password);
        const payload = { user: { id: savedUser.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });
        const userWithoutPassword = savedUser.toObject();
        delete userWithoutPassword.password;
        res.status(201).json({
            message: 'Account created successfully!',
            token,
            user: userWithoutPassword
        });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error during signup.' });
    }
});

// @route   POST api/auth/register
// @desc    Register a new user with a plan OR update an existing user with a plan
// @access  Public
router.post('/register', async (req, res) => {
    const { email, password, fullName, address, country, phoneNumber, plan } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            if (user.isPlanActive) {
                return res.status(400).json({ message: 'This account already has an active plan.' });
            }
            const activationDate = new Date();
            let expiryDate = new Date(activationDate);
            if (plan.cycle === 'monthly') expiryDate.setDate(expiryDate.getDate() + 30);
            else if (plan.cycle === 'yearly') expiryDate.setFullYear(expiryDate.getFullYear() + 1);
            
            user.address = address;
            user.country = country;
            user.phoneNumber = phoneNumber;
            user.plan = plan;
            user.isPlanActive = true;
            user.planActivationDate = activationDate;
            user.planExpiryDate = expiryDate;

            const updatedUser = await user.save();
            const payload = { user: { id: updatedUser.id } };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });
            const userWithoutPassword = updatedUser.toObject();
            delete userWithoutPassword.password;
            
            return res.status(200).json({ message: 'Plan activated successfully!', token, user: userWithoutPassword });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const activationDate = new Date();
        let expiryDate = new Date(activationDate);
        if (plan.cycle === 'monthly') expiryDate.setDate(expiryDate.getDate() + 30);
        else if (plan.cycle === 'yearly') expiryDate.setFullYear(expiryDate.getFullYear() + 1);

        const newUser = new User({ email, password: hashedPassword, fullName, address, country, phoneNumber, plan, isPlanActive: true, planActivationDate: activationDate, planExpiryDate: expiryDate });
        const savedUser = await newUser.save();
        await sendWelcomeEmail(savedUser.email, password);
        const payload = { user: { id: savedUser.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });
        const userWithoutPassword = savedUser.toObject();
        delete userWithoutPassword.password;
        res.status(201).json({ message: 'User registered and plan activated!', token, user: userWithoutPassword });
    } catch (error) {
        console.error('Error during user registration/plan activation:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' });
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
        res.json({ token, user: userWithoutPassword });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route   GET api/auth/me
// @desc    Get logged in user data and CHECK FOR PLAN EXPIRATION
// @access  Private
router.get('/me', authMiddleware, async (req, res) => {
    try {
        let user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // --- NAYI LOGIC: PLAN EXPIRATION CHECK ---
        // Check if the user has an active plan and an expiry date
        if (user.isPlanActive && user.planExpiryDate) {
            const today = new Date();
            // If expiry date is in the past
            if (user.planExpiryDate < today) {
                console.log(`Plan for user ${user.email} has expired. Deactivating...`);
                user.isPlanActive = false;
                // Optional: You can also clear plan details if you want
                user.plan = undefined;
                user.planActivationDate = undefined;
                user.planExpiryDate = undefined;
                
                // Save the updated user status to the database
                await user.save();
            }
        }
        // -----------------------------------------

        res.json({ user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;

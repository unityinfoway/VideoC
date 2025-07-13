const User = require('../models/User');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

// --- Email Transporter Setup ---
// NOTE: .env file mein credentials zaroor rakhein
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

// --- Controller Function ---
const createUser = async (req, res) => {
    try {
        const { email, password, subscription, billingDetails } = req.body;

        // 1. Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User with this email already exists.' });
        }

        // 2. Hash the password for security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create a new user instance
        user = new User({
            email,
            password: hashedPassword,
        });

        // 4. Save the user to the database
        await user.save();

        // 5. Send a welcome email
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Welcome to Vyapaara!',
            html: `<h1>Welcome to Your Vyapaara Account!</h1>
                   <p>Hi ${billingDetails.fullName || ''},</p>
                   <p>Your account has been created successfully with the <b>${subscription.planName}</b> plan.</p>
                   <p><b>Your Username:</b> ${email}</p>
                   <p>You can now log in and access all the amazing assets. Welcome aboard!</p>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Nodemailer Error:', error);
            } else {
                console.log('Welcome Email sent: ' + info.response);
            }
        });

        // 6. Send success response to the frontend
        res.status(201).json({ msg: 'User created and email sent successfully.' });

    } catch (err) {
        console.error('Server Error:', err.message);
        res.status(500).send('An error occurred on the server.');
    }
};

module.exports = {
    createUser,
};
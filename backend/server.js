require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const app = express();
app.use(express.json());
app.use(cors()); // Allows your React app to talk to this server

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Endpoint to Create an Order
app.post('/api/create-order', async (req, res) => {
    const { amount, currency } = req.body;
    const options = {
        amount, // amount in the smallest currency unit
        currency,
        receipt: `receipt_order_${new Date().getTime()}`,
    };
    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).send('Error creating order');
    }
});

// Endpoint to Verify Payment
app.post('/api/verify-payment', (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest('hex');

    if (generated_signature === razorpay_signature) {
        // Payment is authentic
        console.log('Payment verified successfully.');
        res.json({ success: true, message: 'Payment verified successfully.' });
    } else {
        // Payment is not authentic
        console.log('Payment verification failed.');
        res.status(400).json({ success: false, message: 'Payment verification failed.' });
    }
});

const PORT = 5201;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
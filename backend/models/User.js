const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cycle: { type: String, required: true, enum: ['monthly', 'yearly'] },
    price: { type: String, required: true },
}, { _id: false });

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    address: { type: String, trim: true },
    country: { type: String, trim: true },
    phoneNumber: { type: String, trim: true },
    plan: { type: PlanSchema },
    isPlanActive: { type: Boolean, default: false },
    planActivationDate: { type: Date },
    planExpiryDate: { type: Date },
    
    // --- NAYI FIELDS DOWNLOAD LIMIT KE LIYE ---
    downloadCount: {
        type: Number,
        default: 0
    },
    downloadLimitReset: {
        type: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);

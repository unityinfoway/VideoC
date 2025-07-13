const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');
const graphicsTemplates = require('../data/graphicsTemplates.json'); 

// @route   POST api/download/:templateId
// @desc    Handle template download and track user limits
// @access  Private
router.post('/:templateId', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const template = graphicsTemplates.find(t => t.id === req.params.templateId);
        if (!template) {
            return res.status(404).json({ message: 'Template not found.' });
        }

        const isProTemplate = template.price !== 'Free';

        if (!isProTemplate) {
            return res.json({ zipUrl: template.zipUrl });
        }

        if (!user.isPlanActive) {
            return res.status(403).json({ message: 'You need a Pro plan to download this template.' });
        }

        const now = new Date();
        
        // Initialize downloadCount if it doesn't exist
        if (typeof user.downloadCount !== 'number') {
            user.downloadCount = 0;
        }

        if (!user.downloadLimitReset || user.downloadLimitReset < now) {
            user.downloadCount = 0;
            user.downloadLimitReset = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        }

        if (user.downloadCount >= 20) {
            return res.status(429).json({ message: 'You have reached your daily download limit of 20 files.' });
        }

        user.downloadCount++;
        await user.save();

        res.json({ zipUrl: template.zipUrl, remainingDownloads: 20 - user.downloadCount });

    } catch (error) {
        console.error('Error during download:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});

module.exports = router;

const jwt = require('jsonwebtoken');

// This function acts as a gatekeeper for protected routes
module.exports = function (req, res, next) {
    // Get the token from the 'Authorization' header
    const authHeader = req.header('Authorization');

    // Check if a token doesn't exist
    if (!authHeader) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // The token is expected in the format "Bearer <token>"
    // We split the string and take the second part
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ msg: 'Token format is incorrect, authorization denied' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // If the token is valid, add the user's ID to the request object
        req.user = decoded.user;
        
        // Proceed to the next function (the actual route handler)
        next();
    } catch (err) {
        // If the token is not valid, send an error response
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

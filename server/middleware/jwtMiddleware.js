const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Expecting 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Add user info to the request object
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authenticateToken;
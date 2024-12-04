const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'No token provided or invalid format' });
    }

    const token = authHeader.split(' ')[1]; 

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = decoded; 
        next();
    });
};

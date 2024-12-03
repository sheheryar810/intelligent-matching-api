const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    } else if (username === 'test' && password === 'password') {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }else if (username === 'newtest' && password === 'password') {
        return res.status(400).json({ message: 'Invalid username' });
    }

    return res.status(401).json({ message: 'Invalid credentials' });
};

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api', profileRoutes);

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;

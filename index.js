const express = require('express');
const bodyParser = require('body-parser');
const fsdb = require('./fsdb'); // Ensure fsdb.js is in your project directory
const apiRoutes = require('./routes/apiRoutes');
const uiRoutes = require('./routes/uiRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('resources')); // Serve static files

// Routes
app.use('/api', apiRoutes);
app.use('/UI', uiRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

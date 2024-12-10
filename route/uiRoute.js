const express = require('express');
const path = require('path');
const router = express.Router();

// Render the registration form
router.get('/registrations/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/register.html'));
});

// Render the view page
router.get('/registrations/view', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/view.html'));
});

module.exports = router;

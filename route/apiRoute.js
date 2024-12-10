const express = require('express');
const fsdb = require('../fsdb'); // Use the in-memory file database module
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { name, email, date, eventName } = req.body;

    if (!name || !email || !date || !eventName) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const ticketNumber = Date.now().toString(); // Simple unique ticket number
    const ticket = { ticketNumber, name, email, date, eventName };

    await fsdb.write(ticket);
    res.json(ticket);
});

// Get all registrations
router.get('/registrations', async (req, res) => {
    const data = await fsdb.readAll();
    res.json(data);
});

// Get registrations by name
router.get('/registrations/byname/:name', async (req, res) => {
    const { name } = req.params;
    const data = await fsdb.readAll();
    const filtered = data.filter(registration => registration.name === name);
    res.json(filtered);
});

// Get registrations by event name
router.get('/registrations/event/:eventName', async (req, res) => {
    const { eventName } = req.params;
    const data = await fsdb.readAll();
    const filtered = data.filter(registration => registration.eventName === eventName);
    res.json(filtered);
});

// Cancel registration
router.get('/registrations/cancel/:ticketNumber', async (req, res) => {
    const { ticketNumber } = req.params;
    const success = await fsdb.delete(ticketNumber);
    if (success) {
        res.json({ message: `Ticket ${ticketNumber} successfully deleted` });
    } else {
        res.status(404).json({ error: "Ticket not found" });
    }
});

module.exports = router;

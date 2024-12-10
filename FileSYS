const fs = require('fs');
const path = require('path');

// Path to the database file
const DB_FILE = path.join(__dirname, 'data.json');

const fsdb = {
    // Read all records from the database file
    readAll: async () => {
        try {
            if (!fs.existsSync(DB_FILE)) {
                return []; // Return an empty array if file doesn't exist
            }
            const data = await fs.promises.readFile(DB_FILE, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error reading database file:', error);
            return [];
        }
    },

    // Write a new record to the database file
    write: async (record) => {
        try {
            const data = await fsdb.readAll();
            data.push(record); // Add the new record
            await fs.promises.writeFile(DB_FILE, JSON.stringify(data, null, 2));
            return true;
        } catch (error) {
            console.error('Error writing to database file:', error);
            return false;
        }
    },

    // Delete a record by its unique ticket number
    delete: async (ticketNumber) => {
        try {
            const data = await fsdb.readAll();
            const index = data.findIndex(record => record.ticketNumber === ticketNumber);
            if (index === -1) {
                return false; // Record not found
            }
            data.splice(index, 1); // Remove the record
            await fs.promises.writeFile(DB_FILE, JSON.stringify(data, null, 2));
            return true;
        } catch (error) {
            console.error('Error deleting record from database file:', error);
            return false;
        }
    }
};

module.exports = fsdb;

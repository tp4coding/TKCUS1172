document.addEventListener('DOMContentLoaded', () => {
    // Handle registration submission
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const date = document.getElementById('date').value;
        const eventName = document.getElementById('eventName').value;

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, date, eventName })
        });
        const data = await response.json();
        alert(`Registration successful! Ticket Number: ${data.ticketNumber}`);
    });

    // Handle other UI actions similarly (view all, search by name, search by event, delete ticket)
});

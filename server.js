const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3005;

let tickets = [];

app.use(cors());
app.use(bodyParser.json());

app.post('/submit-ticket', (req, res) => {
    const { name, email, description } = req.body;
    const newTicket = { id: tickets.length + 1, name, email, description, status: 'new' };
    tickets.push(newTicket);
    console.log(`New ticket submitted: ${JSON.stringify(newTicket)}`);
    
/*
    Would normally send email here with a sendEmail function.
    Function would send email saying something like:
    msg = `Greeting help desk support, a new ticket has been created
    you can login to view it at website.url/tickets
    ${newTicket}
*/
    res.status(201).json(newTicket);
});

app.get('/tickets', (req, res) => {
    console.log('Retrieving ticket list');
    res.status(200).json(tickets);
});

app.put('/update-ticket/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const index = tickets.findIndex((ticket) => ticket.id === parseInt(id));

    if (index !== -1) {
        tickets[index].status = status;
        console.log(`Ticket ${id} updated - Status: ${status}`);
        res.status(200).json(tickets[index]);
    }   else {
        res.status(404).json({ error: 'Ticket not found '});
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
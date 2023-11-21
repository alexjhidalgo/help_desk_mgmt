import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// A login or SSO could be placed here in a real Backend Admin Panel 

const TicketList = ({ tickets, updateTicketStatus}) => {
    const handleStatusUpdate = (id, status) => {
        axios.put(`http://localhost:3005/update-ticket/${id}`, {status})
        .then((response) => {
            updateTicketStatus(response.data);
        })
        .catch((error) => console.error('Error updating ticket status:', error));
    };

    return (
        <div>
            <h2>Backend Admin Panel</h2>
            <ul>
                {tickets.map((ticket) => (
                    <li key = {ticket.id}>
                        {ticket.name} - {ticket.email} - {ticket.description} - status: {ticket.status}
                        {ticket.status !== 'in-progress' && (
                            <button onClick = {() => handleStatusUpdate(ticket.id, 'in-progress')}>
                                Mark as in Progress
                            </button>
                        )}
                        {ticket.status !== 'resolved' && (
                            <button onClick = {() => handleStatusUpdate(ticket.id, 'resolved')}>
                                Resolve Ticket
                            </button>
                        )}
                            
                    </li>
                ))}
            </ul>

            <div>
                <Link to = "/">Return to Main Page</Link>
            </div>
        </div>
    );
};

export default TicketList;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import axios from 'axios';
import MainPage from './MainPage';
import TicketList from './TicketList';
import './styles.css';

function App() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3005/tickets')
      .then((response) => setTickets(response.data))
      .catch((error) => console.error('Error fetching tickets:', error));
  }, []);

  const submitTicket = (name, email, description) => {
    axios.post('http://localhost:3005/submit-ticket', { name, email, description })
      .then((response) => setTickets([...tickets, response.data]))
      .catch((error) => console.error('Error submitting ticket:', error));
  };

  const updateTicketStatus = (updatedTicket) => {
    const updatedTickets = tickets.map((ticket) =>
    ticket.id === updatedTicket.id ? updatedTicket : ticket
    );
    setTickets(updatedTickets);
  }

  return (
    <Router>
      <div>

      <Routes>
        <Route path = "/" element = {<MainPage submitTicket = {submitTicket}/>} >
        </Route>
          
        <Route path = "/tickets" element = {<TicketList tickets = {tickets} updateTicketStatus = {updateTicketStatus}/>}> 
        </Route>
      </Routes>

      </div>
    </Router>
  );
}

export default App;
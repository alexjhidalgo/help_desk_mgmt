import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MainPage = ({ submitTicket}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

const handleSubmit = () => {
    submitTicket(name, email, description);
    setFormSubmitted(true)

    setName('');
    setEmail('');
    setDescription('');
};

return (
    <div>
      <h1>Support Ticket System</h1>
      {formSubmitted ? (
        <div>
          <p>Thank You! Your request has been submitted.</p>
        </div>
      ) : (
        <div>
          <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>Email:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Description:</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <button onClick={handleSubmit}>Submit Ticket</button>
        </div>
      )}

      <div>
        <h2>Backend Admin?</h2>
        <Link to="/tickets">Click Here</Link>
      </div>
    </div>
  );
};

export default MainPage;
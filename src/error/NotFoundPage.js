import React from 'react';
import { useLocation } from 'react-router-dom';
import './NotFoundPage.css'; // Import file CSS

const NotFoundPage = () => {
  const location = useLocation();
  const message = location.state?.message || 'The page you are looking for could not be found.';

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">{message}</p>
        <a href="/" className="not-found-link">Go Back to Home</a>
      </div>
    </div>
  );
};

export default NotFoundPage;

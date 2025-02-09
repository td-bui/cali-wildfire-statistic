import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackOutline } from 'react-icons/io5';
import './BackButton.css';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="back-button-container">
      <button 
        onClick={() => navigate('/')}
        className="back-button"
      >
        <IoArrowBackOutline size={30} />
      </button>
    </div>
  );
};

export default BackButton;

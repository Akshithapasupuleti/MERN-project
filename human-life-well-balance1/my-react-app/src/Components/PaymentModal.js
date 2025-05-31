// PaymentModal.js

import React, { useState } from 'react';
import Modal from 'react-modal';
import './PaymentModal.css';

Modal.setAppElement('#root'); // Ensure accessibility

const PaymentModal = ({ isOpen, onRequestClose, onSubmit }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit({ cardNumber, expiryDate, cvv });
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Payment Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <h2>Payment Information</h2>
      <form onSubmit={handleSubmit}>
        <label>Card Number</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
        <label>Expiry Date</label>
        <input
          type="text"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
        />
        <label>CVV</label>
        <input
          type="text"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
        />
        <button type="submit">Submit Payment</button>
      </form>
    </Modal>
  );
};

export default PaymentModal;

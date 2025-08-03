import React, { useState, useEffect } from 'react';

const Toast = ({ message, type = 'info', duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation to complete
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyle = () => {
    const baseStyle = {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '16px 24px',
      borderRadius: '8px',
      color: '#fff',
      fontWeight: '500',
      fontSize: '14px',
      zIndex: 1000,
      maxWidth: '400px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform 0.3s ease-in-out',
      cursor: 'pointer'
    };

    switch (type) {
      case 'success':
        return { ...baseStyle, background: '#28a745' };
      case 'error':
        return { ...baseStyle, background: '#dc3545' };
      case 'warning':
        return { ...baseStyle, background: '#ffc107', color: '#212529' };
      default:
        return { ...baseStyle, background: '#17a2b8' };
    }
  };

  return (
    <div style={getToastStyle()} onClick={() => setIsVisible(false)}>
      {message}
    </div>
  );
};

export default Toast; 
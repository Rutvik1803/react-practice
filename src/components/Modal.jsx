import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, onClose, children }) => {
  // Close modal on ESC key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // If not open, don’t render
  if (!isOpen) return null;

  // Render modal using React Portal
  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
      onClick={onClose} // click outside closes modal
    >
      <div
        style={{
          background: 'white',
          padding: '20px',
          borderRadius: '10px',
          minWidth: '300px',
        }}
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
      >
        {children}
        <button
          onClick={onClose}
          style={{ marginTop: '10px', background: 'lightgray' }}
        >
          Close
        </button>
      </div>
    </div>,
    document.body // Portal target
  );
};

export default Modal;

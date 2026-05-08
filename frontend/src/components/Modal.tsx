import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-lg"
        onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing it
      >
        {children}
      </div>
    </div>
  );
}

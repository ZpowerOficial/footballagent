// src/components/common/Modal.jsx
import React from 'react';
import { X } from 'lucide-react';
import { useGameContext } from '../../core/GameContext';

const Modal = ({ title, content, actions, onClose }) => {
  const { hideModal } = useGameContext();
  
  const handleClose = () => {
    if (onClose) onClose();
    hideModal();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-medium">{title}</h2>
          <button onClick={handleClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6">
          {typeof content === 'string' ? (
            <p className="mb-6">{content}</p>
          ) : (
            <div className="mb-6">{content}</div>
          )}
          
          <div className="flex justify-end space-x-3">
            {actions?.map((action, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded ${
                  action.primary
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => {
                  action.onClick();
                  if (!action.keepOpen) hideModal();
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
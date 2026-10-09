import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-xl' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-purple-950/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={`relative w-full ${maxWidth} transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-2xl transition-all border border-peach-200 z-10`}
        >
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-peach-100">
            <h3 className="text-xl font-bold text-purple-950">{title}</h3>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-purple-400 hover:bg-peach-100 hover:text-purple-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-2">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

import { ReactNode } from 'react';

interface ModalProps {
  title: string;
  children: ReactNode;
  onClose: () => void;
  footer?: ReactNode;
}

export default function Modal({ title, children, onClose, footer }: ModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-gray-900 rounded-xl shadow-lg max-w-md w-full p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-sm"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="text-white space-y-4">{children}</div>
        {footer && <div className="mt-6">{footer}</div>}
      </div>
    </div>
  );
}

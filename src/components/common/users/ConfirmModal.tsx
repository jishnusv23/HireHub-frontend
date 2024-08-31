import React from "react";
import { useTheme } from "../../ui/theme-provider";
import { motion } from "framer-motion";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  const { theme } = useTheme();

  const handleConfirmBlock = () => {
    onConfirm();
  };

  const handleCancelBlock = () => {
    onCancel();
  };

  return (
    <div
      className={`  z-10 fixed inset-0 flex items-center justify-center ${
        theme === "light" ? "bg-white bg-opacity-50" : "bg-black bg-opacity-75"
      }`}
    >
      <motion.div
        className={`w-full max-w-xs md:max-w-sm lg:max-w-md p-6 rounded-lg shadow-lg  bg-backgroundAccent`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-lg mb-4">{`Are you sure you want to ${message}?`}</p>
        <div className="flex flex-col md:flex-row md:justify-end md:space-x-2">
          <button
            className="bg-red-600 text-white py-2 px-4 rounded-lg font-semibold shadow-md transition-colors duration-300 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 mt-2 md:mt-0 text-sm md:text-base "
            onClick={handleCancelBlock}
          >
            Do it later
          </button>
          <button
            className="bg-primary text-white py-2 px-4 rounded-lg font-semibold shadow-md transition-colors duration-300 ease-in-out hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light text-sm md:text-base"
            onClick={handleConfirmBlock}
          >
            Yes
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmModal;

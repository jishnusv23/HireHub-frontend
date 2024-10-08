import React, { Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Button } from "../ui/button";
import CloseIcon from "@mui/icons-material/Close";
interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 " onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto pt-16 lg:pt-6">
          <div className="flex items-center justify-center h-fitp-4 md:p-8 text-center ">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100  "
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md sm:max-w-lg md:max-w-2xl  transform overflow-hidden rounded-2xl bg-background p-6 text-left align-middle shadow-xl transition-all">
                <div
                  onClick={onClose}
                  className="absolute top-3 right-3 bg-primary hover:bg-red-500 rounded-xl"
                >
                  <CloseIcon sx={{ color: "white" }} className="w-6 h-6" />
                </div>
                <DialogTitle
                  as="h3"
                  className="text-xl md:text-2xl font-bold leading-6 text-center "
                >
                  {title}
                </DialogTitle>

                <div className="mt-4 w-full p-4 rounded-md">{children}</div>

                <div className="mt-6 flex justify-end"></div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

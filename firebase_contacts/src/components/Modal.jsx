import React from "react";
import { IoMdClose } from "react-icons/io";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className=" flex  absolute backdrop-blur h-[100vh] w-[100%] top-0 z-40 right-0">
          <div className="  relative z-50 bg-white min-h-56 w-[20%] m-auto p-3">
            <div className="flex text-[24px] justify-end ">
              <IoMdClose onClick={onClose} className=" cursor-pointer" />
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;

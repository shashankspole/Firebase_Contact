import React, { useState } from "react";
import profile from "../assets/profile.svg";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import AddAndUpdate from "./AddAndUpdate";
import useDisclouse from "../hooks/useDisclouse";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const { isOpen, onClose, onOpen } = useDisclouse();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div key={contact.id} className="bg-[#FFEAAE] rounded-[10px] mt-3 ">
        <div className="flex px-2 py-3 justify-between items-center ">
          <div className="flex gap-3   ">
            <img src={profile} alt="profile_img..." />

            <div className=" leading-6">
              <h2 className="text-[18px] font-[600]">{contact.name}</h2>
              <p className="text-[15px] font-[500]">{contact.email}</p>
            </div>
          </div>
          <div className="flex text-[34px] gap-2 ">
            <AiOutlineEdit onClick={onOpen} className=" cursor-pointer" />
            <MdDeleteOutline
              onClick={() => deleteContact(contact.id)}
              className=" cursor-pointer"
            />
          </div>
        </div>
      </div>
      <AddAndUpdate
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
        contact={contact}
      />
    </div>
  );
};

export default ContactCard;

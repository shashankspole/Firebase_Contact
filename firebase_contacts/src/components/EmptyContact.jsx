import React from "react";
import empContact from "../assets/empty_contact.png";

const EmptyContact = () => {
  return (
    <div className="flex justify-center items-center gap-5   ">
      <img src={empContact} alt="emp_contact.." />
      <h2 className=" text-[24px] font-[600] text-white">No Contact Found</h2>
    </div>
  );
};

export default EmptyContact;

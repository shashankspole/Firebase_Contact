import React, { useEffect, useState } from "react";
import logo_firebase from "../assets/logos_firebase.svg";
import searchIcon from "../assets/search.svg";
import add_img from "../assets/add.svg";
import EmptyContact from "./EmptyContact";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

import ContactCard from "./ContactCard";
import Modal from "./Modal";
import AddAndUpdate from "./AddAndUpdate";
import useDisclouse from "../hooks/useDisclouse";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactPage = () => {
  const [contacts, setContacts] = useState();
  const [searchFilter, setSearchFilter] = useState();

  const { isOpen, onClose, onOpen } = useDisclouse();

  useEffect(() => {
    const getContact = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactList);
          return contactList;
        });
      } catch (error) {
        console.log(error);
      }
    };

    getContact();
  }, []);

  const handlerChange = (e) => {
    const textvalue = e.target.value;
    setSearchFilter(textvalue.toLowerCase());
  };

  return (
    <>
      <div className="bg-black h-screen ">
        <div className="bg-[#323334] max-w-96 mx-auto pt-3 px-4 h-[100%] ">
          <div className=" border-2 p-4 rounded-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] bg-white flex justify-center items-center gap-3">
            <img src={logo_firebase} alt="logo... " />
            <h2 className=" font-[700] text-[20px]">Firebase Contact App</h2>
          </div>
          <div className="pt-5 flex justify-between items-center gap-3">
            <div className="flex border-2 px-3 py-2 h-11  rounded-[10px]">
              <img src={searchIcon} alt="img.." />
              <input
                className=" bg-transparent px-3 outline-none text-white"
                placeholder="Search Contact"
                type="text"
                onChange={handlerChange}
              />
            </div>
            <div className="bg-white flex justify-center items-center p-2 rounded-full cursor-pointer">
              <img src={add_img} alt="addimg.." onClick={onOpen} />
            </div>
          </div>
          {contacts === undefined ? (
            <div className="flex flex-col mt-6 pt-6 justify-center items-center h-96">
              <EmptyContact />
            </div>
          ) : (
            <>
              {contacts.map((contact) => {
                if (searchFilter === undefined) {
                  return (
                    <div key={contact.id}>
                      <ContactCard contact={contact} />
                    </div>
                  );
                } else {
                  if (contact.name.toLowerCase().includes(searchFilter)) {
                    return (
                      <div key={contact.id}>
                        <ContactCard contact={contact} />
                      </div>
                    );
                  }
                }
              })}
            </>
          )}

          <AddAndUpdate isOpen={isOpen} onClose={onClose} />
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="light"
          />
        </div>
      </div>
    </>
  );
};

export default ContactPage;

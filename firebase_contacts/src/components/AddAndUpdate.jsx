import React from "react";
import Modal from "./Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { db } from "../config/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import * as Yup from "yup";

const ContactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required"),
});

const AddAndUpdate = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContent = async (contacts) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contacts);
      onClose();
      toast.success("Contact added successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const updateContent = async (contacts, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contacts);
      onClose();
      toast.success("Contact added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={ContactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            console.log(values);
            isUpdate ? updateContent(values, contact.id) : addContent(values);
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field name="name" type="text" className="border h-8 px-2" />
              <div className="text-red-500 text-[13px]">
                <ErrorMessage name="name" />
              </div>
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" className="border h-8 px-2" />
              <div className="text-red-500 text-[13px]">
                <ErrorMessage name="email" />
              </div>
            </div>
            <button
              type="submit"
              className="bg-yellow-300 p-2 font-[500] self-end border hover:bg-yellow-400"
            >
              {isUpdate ? "Update" : "Add"} User
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdate;

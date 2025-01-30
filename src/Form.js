import React, { useState, useRef, useEffect } from "react";
// import "./style.css"; // Assume custom styles for the modal and button are defined here
import './Modal.css';
const FormModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ref for the modal content to detect outside clicks
  const modalRef = useRef(null);

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  // Event listener to detect clicks outside the modal content
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isModalOpen]);

  // Form submission handler with validation
  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const dob = event.target.dob.value;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    // Phone number validation (10-digit number)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    // Date of Birth validation (simple check for empty field)
    if (!dob) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    // Close the modal after successful submission
    closeModal();
    alert("Form submitted successfully!");
  };

  return (
    <div style={{display:'flex',flexDirection:'column', justifyContent:'center',alignItems:'center'}}>
      <h1>User Details Modal</h1>
      <button className="open-btn" onClick={openModal}>Open Form</button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content" ref={modalRef}>
          <h3>Fill Details</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" required style={{width:'100%', maxWidth: "500px"}}/>
              </div>
              <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" required />
              </div>
              <div>
                <label htmlFor="phone">Phone Number:</label>
                <input type="text" id="phone" required />
              </div>
              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" id="dob" required />
              </div>
              
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormModal;
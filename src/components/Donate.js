import React, { useState } from "react";

import Header from "../components/Header";
import "../assets/styles/Donate.css";

function DonationForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    contactNo: "",
    pickupAddress: "",
    contactPerson: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    setForm({
      fullName: "",
      email: "",
      contactNo: "",
      pickupAddress: "",
      contactPerson: "",
    });
  };

  return (
    <div>
        <Header/>
    <div className="donation-form-container" >
      <form className="donation-form" onSubmit={handleSubmit}>
        <h1>Donate</h1>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contactNo"
          placeholder="Contact No."
          value={form.contactNo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="pickupAddress"
          placeholder="Pick up Address"
          value={form.pickupAddress}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contactPerson"
          placeholder="Contact of Person"
          value={form.contactPerson}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
}

export default DonationForm;

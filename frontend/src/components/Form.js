// frontend/src/components/Form.js
import React, { useState } from 'react';
import axios from 'axios';
import styles from "./form.module.css";

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumbers: '', 
    emailAddresses: '',
    address:'',
    organization: '',
    birthday: '',
    notes: '',
    socialProfiles: '',
    url: '',
    photo:'',
    nickname: '',
    anniversary:'' ,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/data', formData);
      alert('Data submitted successfully!');
      setFormData({  name: '',
        phoneNumbers: '', 
        emailAddresses: '',
        address:'',
        organization: '',
        birthday: '',
        notes: '',
        socialProfiles: '',
        url: '',
        photo:'',
        nickname: '',
        anniversary:'' ,});
    } catch (error) {
      alert('Failed to submit data!');
    }
  };

  return (
    <>
    {/* <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        required
      />
      <button type="submit}>Submit</button>
    </form> */}

    <div className={styles.container}>
  <div className={styles.header}>
    <h1>Form Submission</h1>
  </div>

  {/* <form onSubmit={handleSubmit} className={styles.form}>
    <div className={styles.formgroup}>
      <input type="text" placeholder="Full Name" name="name" required onChange={handleChange} />
    </div>

    <div className={styles.formgroup}>
      <input type="email" placeholder="Email Address" name="email" required onChange={handleChange} />
    </div>

    <div className={styles.formgroup}>
      <input type="tel" placeholder="Phone Number" required name="phone" onChange={handleChange} />
    </div>

    <div className={styles.formgroup}>
      <input type="text" placeholder="Mcyber Academy Enrollment Number" required name="enrolmentId" onChange={handleChange} />
    </div>

    <div className={styles.formgroup}>
      <input type="text" placeholder="State/City" name="state" required onChange={handleChange} />
    </div>

    <div className={styles.formgroup}>
      <input type="url" placeholder="Resume (Google Drive Link)" name="resume" required onChange={handleChange} />
    </div>

    <div className={styles.formgroup}>
      <button type="submit" className={styles.submitbutton}>Apply</button>
    </div>
  </form> */}
  <form onSubmit={handleSubmit} className={styles.form}>
  <div className={styles.formgroup}>
    <input type="text" placeholder="Full Name" name="name" required onChange={handleChange} />
  </div>

  <div className={styles.formgroup}>
    <input type="tel" placeholder="Phone Numbers (e.g., Home, Work, Mobile)" name="phoneNumbers" required onChange={handleChange} />
  </div>

  <div className={styles.formgroup}>
    <input type="email" placeholder="Email Addresses (e.g., Personal, Work)" name="emailAddresses" required onChange={handleChange} />
  </div>

  <div className={styles.formgroup}>
    <input type="text" placeholder="Address (e.g., Home, Work)" name="address" required onChange={handleChange} />
  </div>

  <div className={styles.formgroup}>
    <input type="text" placeholder="Organization (e.g., Company and Position)" name="organization" onChange={handleChange} />
  </div>

  <div className={styles.formgroup}>
    <input type="date" placeholder="Birthday" name="birthday" onChange={handleChange} />
  </div>

  <div className={styles.formgroup}>
    <textarea placeholder="Notes" name="notes" onChange={handleChange}></textarea>
  </div>

  <div className={styles.formgroup}>
    <input type="text" placeholder="Social Profiles (e.g., LinkedIn, Twitter)" name="socialProfiles" onChange={handleChange} />
  </div>

  <div className={styles.formgroup}>
    <input type="url" placeholder="URL (e.g., Website)" name="url" onChange={handleChange} />
  </div>

  <div className={styles.formgroup}>
    <input type="url" placeholder="Photo URL" name="photo" onChange={handleChange} />
  </div>

  <div className={styles.formgroup}>
    <input type="text" placeholder="Nickname" name="nickname" onChange={handleChange} />
  </div>

  <div className={styles.formgroup}>
    <input type="date" placeholder="Anniversary" name="anniversary" onChange={handleChange} />
  </div>

  <div className={styles.formgroup}>
    <button type="submit" className={styles.submitbutton}>Save Contact</button>
  </div>
</form>

</div>

</>
  );
}

export default Form;

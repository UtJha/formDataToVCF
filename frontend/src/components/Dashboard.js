// frontend/src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';
function Dashboard() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/data?query=${searchQuery}`
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      alert('Failed to fetch data!');
      setError('Failed to fetch contacts');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const handleDownload = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/data/csv',
        { responseType: 'blob' }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'data.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert('Failed to download CSV!');
    }
  };

  const downloadVcf = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/api/data/vcf',
        { responseType: 'blob' }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'data.vcf'); // Updated to download VCF
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      alert('Failed to download VCF!');
    }
  };
  if (loading) {
    return <p>Loading contacts...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="dashboard">
      <h1>Contact Dashboard</h1>
      <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleDownload}>Download CSV</button>
      <button onClick={downloadVcf}>Download VCF</button>
      </div>
      <table className="contacts-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Numbers</th>
            <th>Email Addresses</th>
            <th>Address</th>
            <th>Organization</th>
            <th>Birthday</th>
            <th>Notes</th>
            <th>Social Profiles</th>
            <th>URL</th>
            <th>Photo</th>
            <th>Nickname</th>
            <th>Anniversary</th>
          </tr>
        </thead>
        <tbody>
          {data.map((contact, index) => (
            <tr key={index}>
              <td>{contact.name}</td>
              <td>{contact.phoneNumbers}</td>
              <td>{contact.emailAddresses}</td>
              <td>{contact.address}</td>
              <td>{contact.organization}</td>
              <td>{contact.birthday ? new Date(contact.birthday).toLocaleDateString() : '-'}</td>
              <td>{contact.notes}</td>
              <td>{contact.socialProfiles}</td>
              <td>{contact.url}</td>
              <td>
                {contact.photo ? (
                  <img src={contact.photo} alt={contact.name} className="photo-thumbnail" />
                ) : (
                  'No Photo'
                )}
              </td>
              <td>{contact.nickname}</td>
              <td>{contact.anniversary ? new Date(contact.anniversary).toLocaleDateString() : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;

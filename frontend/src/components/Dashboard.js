// frontend/src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/data?query=${searchQuery}`
      );
      setData(response.data);
    } catch (error) {
      alert('Failed to fetch data!');
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

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleDownload}>Download CSV</button>
      <button onClick={downloadVcf}>Download VCF</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;

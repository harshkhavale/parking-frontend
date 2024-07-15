// src/components/CheckInForm.js
import { useState } from 'react';
import toast from 'react-hot-toast';

// eslint-disable-next-line react/prop-types
const CheckInForm = ({ onCheckIn }) => {
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [licensePlate, setLicensePlate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://parking-system-api.onrender.com/api/checkin/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        manufacturer,
        model,
        license_plate: licensePlate,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      toast.success(data.message);
      onCheckIn(); // Trigger the callback to update the vehicle list
      setManufacturer('');
      setModel('');
      setLicensePlate('');
    } else {
      toast.error(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700">Manufacturer</label>
        <input
          type="text"
          className="mt-1 block w-full border"
          value={manufacturer}
          onChange={(e) => setManufacturer(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Model</label>
        <input
          type="text"
          className="mt-1 block w-full border"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">License Plate</label>
        <input
          type="text"
          className="mt-1 block w-full border"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Check In</button>
    </form>
  );
};

export default CheckInForm;

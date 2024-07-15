// src/pages/HomePage.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckInForm from '../components/CheckInForm';
import VehicleCard from '../components/VehicleCard';
import car from "../assets/classic-car.png";

const HomePage = () => {
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  const fetchVehicles = async () => {
    const response = await fetch('https://parking-system-api.onrender.com/api/active-vehicles/', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    setVehicles(data);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <div className="min-h-screen relative bg-gray-100 cursor-pointer">
      <div className='flex items-center  bg-white p-4 '>
        <p className='text-2xl'>Parking Manager</p>
        <img src={car} alt="car" className='w-14 h-14 ml-4' />
      </div>
      <div className=' p-6'>
      <CheckInForm onCheckIn={fetchVehicles} />
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {vehicles.map(vehicle => (
          <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} onClick={() => navigate(`/vehicle/${vehicle.id}`)} />
        ))}
      </div>
      </div>
      
    </div>
  );
};

export default HomePage;

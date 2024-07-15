import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Vehicle = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const fetchVehicleDetails = async () => {
      const response = await fetch(`https://parking-system-api.onrender.com/api/active-vehicles/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setVehicle(data);
    };
    fetchVehicleDetails();
  }, [id]);

  if (!vehicle) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">{vehicle.manufacturer} {vehicle.model}</h2>
        <p className="mb-2"><strong>License Plate:</strong> {vehicle.license_plate}</p>
        <p className="mb-2"><strong>Check-in Time:</strong> {new Date(vehicle.checkin_time).toLocaleString()}</p>
        {vehicle.checkout_time && (
          <>
            <p className="mb-2"><strong>Check-out Time:</strong> {new Date(vehicle.checkout_time).toLocaleString()}</p>
            <p className="mb-2"><strong>Total Amount:</strong> ${vehicle.total_amount}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Vehicle;

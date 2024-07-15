import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import car from "../assets/classic-car.png"
import toast from 'react-hot-toast';

const Vehicle = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0); // Start with a default value
  const navigate = useNavigate();
  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await fetch(`https://parking-system-api.onrender.com/api/active-vehicles/${id}/`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch vehicle details');
        }

        const data = await response.json();
        setVehicle(data);
        console.log(data);
        calculateTotalAmount(data.check_in_time); // Call calculation after vehicle data is set
      } catch (error) {
        console.error('Error fetching vehicle details:', error);
      }
    };

    fetchVehicleDetails();
  }, [id]);

  const calculateTotalAmount = (checkinTime) => {
    const currentDateTime = new Date(); // Current date and time
    const checkinDateTime = new Date(checkinTime); // Convert ISO 8601 string to Date object
    const timeDifferenceMs = currentDateTime - checkinDateTime; // Difference in milliseconds
    const timeDifferenceHrs = timeDifferenceMs / (1000 * 60 * 60); // Convert milliseconds to hours
  
    // Assuming rate is $100 per hour, adjust this based on your actual pricing logic
    const ratePerHour = 100;
    const calculatedAmount = Math.ceil(timeDifferenceHrs) * ratePerHour; // Total amount to pay
    setTotalAmount(calculatedAmount); // Update state with calculated amount
  };
  
  

  const handleCheckout = async () => {
    try {
      const response = await fetch(`https://parking-system-api.onrender.com/api/checkout/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          license_plate: vehicle.license_plate,
        }),
      });

      if (!response.ok) {
        toast.error('Failed to checkout vehicle');
        throw new Error('Failed to checkout vehicle');
      }

      toast.success('Vehicle checked out successfully');
      navigate('/home');

    } catch (error) {
      console.error('Error checking out vehicle:', error);
    }
  };

  if (!vehicle) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded shadow-md">
        <img src={car} alt="car" className='size-40' />
        <h2 className="text-2xl mb-4">{vehicle.manufacturer} {vehicle.model}</h2>
        <p className="mb-2"><strong>License Plate:</strong> {vehicle.license_plate}</p>
        <p className="mb-2"><strong>Check-in Time:</strong> {new Date(vehicle.checkin_time).toLocaleString()}</p>
        {vehicle.checkout_time ? (
          <>
            <p className="mb-2"><strong>Check-out Time:</strong> {new Date(vehicle.checkout_time).toLocaleString()}</p>
            <p className="mb-2"><strong>Total Amount:</strong> ${totalAmount}</p>
          </>
        ) : (
          <>
            <p className="mb-2"><strong>Total Amount:</strong> ${totalAmount}</p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={handleCheckout}>Checkout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Vehicle;

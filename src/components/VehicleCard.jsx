/* eslint-disable react/prop-types */
import car from "../assets/classic-car.png"
import { formatDate } from "../lib/utils";

const VehicleCard = ({ vehicle, onClick }) => {
  return (
    <div onClick={onClick} className="bg-white p-4 rounded shadow-md cursor-pointer">
        <img src={car} alt="car" />
      <h2 className="text-xl font-bold">{vehicle.manufacturer} {vehicle.model}</h2>
      <p><strong>License Plate:</strong> {vehicle.license_plate}</p>
      <p><strong>Check-in Time:</strong> {formatDate(vehicle.check_in_time)}</p>
    </div>
  );
};

export default VehicleCard;

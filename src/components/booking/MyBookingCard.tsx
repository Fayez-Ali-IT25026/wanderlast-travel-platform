
"use client";

import Image from "next/image";
import {
  FiCalendar,
  FiHash,
  FiTrash2,
  FiCheckCircle,
} from "react-icons/fi";

export interface Booking {
  _id: string;
  name: string;
  country: string;
  price: number;
  departureDate: string;
  imageUrl: string;
}

const MyBookingCard = ({ booking }: { booking: Booking }) => {
  const { _id, name, country, price, departureDate, imageUrl } = booking;

  const handleCancel = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/my-booking/${_id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to cancel booking");
      }

      const data = await res.json();
      if (data.deletedCount === 0) {
        throw new Error("No booking was deleted");
      }
      console.log(data);

      alert("Booking cancelled successfully!");

      // Refresh the page to show updated bookings
      window.location.reload();
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  const formattedDate = new Date(departureDate).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <div className="flex flex-col sm:flex-row gap-5 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
      <Image
        src={imageUrl}
        alt={name}
        width={256}
        height={176}
        className="w-full sm:w-64 h-44 object-cover rounded-lg"
      />

      <div className="flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
            <FiCheckCircle /> Confirmed
          </span>

          <h2 className="text-2xl font-semibold text-gray-900">
            {name}
          </h2>

          <p className="text-sm text-gray-500">{country}</p>

          <p className="flex items-center gap-2 text-xs text-gray-600">
            <FiCalendar /> Departure: {formattedDate}
          </p>

          <p className="flex items-center gap-2 text-xs text-gray-600">
            <FiHash /> Booking ID: {_id.slice(-6)}
          </p>
        </div>

        <div className="flex items-end justify-between mt-4">
          <p className="text-2xl font-semibold text-cyan-600">
            ${Number(price).toLocaleString()}
          </p>

          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 px-4 py-1.5 text-sm text-red-500 border border-red-300 rounded-md hover:bg-red-50"
            >
              <FiTrash2 /> Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookingCard;

import React, { useState } from 'react';
import { ChevronRight, Home, Ruler, Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';

const MoveDetails = ({ move }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} at ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`;
  };

  return (
    <div>
      <div className="border rounded-lg mb-4 p-4 bg-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Home className="text-gray-500" />
            <div className="flex flex-col">
              <span className="font-semibold">{move.moving_from}</span>
              <div className="flex items-center">
                <ChevronRight className="text-gray-400" />
                <span className="text-gray-500">{move.moving_to}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Ruler className="text-gray-500 mr-1" />
              <span>{move.distance}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="text-gray-500 mr-1" />
              <Clock className="text-gray-500 mr-1" />
              <span>{formatDate(move.moving_on)}</span>
            </div>
            <div>
              <span className="text-red-500 font-semibold">Request# {move.estimate_id}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button className="flex items-center text-blue-500 border border-blue-500 px-3 py-1 rounded" onClick={toggleExpand} >
            View Move Details
            {expanded ? <ChevronUp className="ml-2" /> : <ChevronDown className="ml-2" />}
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            {move.custom_status || "Quotes Awaiting"}
          </button>
        </div>
        {expanded && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Inventory Details</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(move.items).map(([room, items]) => (
                <div key={room} className="border rounded p-2">
                  <h4 className="font-semibold capitalize flex items-center justify-between">
                    <span>{room} <span className="ml-2 bg-red-500 text-white rounded-full w-5 h-5 inline-flex items-center justify-center text-xs">{items.length}</span></span>
                    <ChevronDown />
                  </h4>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h3 className="font-semibold mb-2">House Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Existing House Details</h4>
                  <p>Floor No: {move.old_floor_no}</p>
                  <p>Elevator Available: {move.old_elevator_availability ? 'Yes' : 'No'}</p>
                  <p>Distance from Elevator/Staircase to Truck: {move.old_parking_distance}</p>
                </div>
                <div>
                  <h4 className="font-semibold">New House Details</h4>
                  <p>Floor No: {move.new_floor_no}</p>
                  <p>Elevator Available: {move.new_elevator_availability ? 'Yes' : 'No'}</p>
                  <p>Distance from Elevator/Staircase to Truck: {move.new_parking_distance}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoveDetails;
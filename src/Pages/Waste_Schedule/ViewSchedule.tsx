import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../../Services/UserService';
import { ScheduleService, Schedule } from '../../Services/ScheduleService'; 
import Logout_Component from '../../Components/Logout_Component';

const ViewSchedule: React.FC = () => {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");

    if (token) {
      const fetchUserDetails = async () => {
        try {
          const userResponse = await UserService.fetchUser(token);
          setUid(userResponse._id);
        } catch (err) {
          console.error('Error fetching user details:', err);
        }
      };

      fetchUserDetails();
    } else {
      console.log("No token found, please log in.");
    }
  }, []); 

  // Fetch schedules using ScheduleService
  const fetchSchedules = async () => {
    if (uid) {
      try {
        const fetchedSchedules = await ScheduleService.fetchSchedulesByUserId(uid);
        console.log(uid)
        setSchedules(fetchedSchedules);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      }
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [uid]); // Fetch schedules when uid changes

  
  const handleUpdate = (_id: string | undefined) => {
    if (_id) {
      console.log(_id);
      navigate(`/schedule/update/${_id}`);
    } else {
      console.error("Schedule ID is undefined.");
    }
  };
  
  const handleDelete = async (_id: string | undefined) => {
    if (_id) {
      if (window.confirm('Are you sure you want to delete this schedule?')) {
        try {
          await ScheduleService.deleteSchedule(_id);
          setSchedules(schedules.filter(schedule => schedule._id !== _id));
        } catch (error) {
          console.error('Error deleting schedule:', error);
        }
      }
    } else {
      console.error("Schedule ID is undefined.");
    }
  };

  
  return (
    <div className="flex flex-col justify-center items-center h-auto bg-gray-100 p-4">
      <h2 className="text-2xl font-bold text-center mb-6 text-green-600">Waste Collection Schedules</h2>
      <Logout_Component/>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {schedules.map(schedule => (
          <div key={schedule._id} className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-center text-green-600">{schedule.type}</h3>
            <p className="text-gray-700 mb-2"><strong>Date:</strong> {schedule.cdate}</p>
            <p className="text-gray-700 mb-2"><strong>Timeslot:</strong> {schedule.timeslot}</p>
            <p className="text-gray-700 mb-4"><strong>Description:</strong> {schedule.description}</p>

            <div className="flex justify-between">
              <button
                onClick={() => handleUpdate(schedule._id)}
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(schedule._id) }
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewSchedule;

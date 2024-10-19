import React, { useState, useEffect } from 'react';
import { ScheduleService, Schedule } from '../../Services/ScheduleService';
import { useFetchUser } from '../../Hooks/GetUserID';


const Schedule_Satus_Admin: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { userId } = useFetchUser();

  // Fetch schedules with jobstatus = false
  const fetchSchedules = async () => {
    try {
      const response = await ScheduleService.fetchAllSchedules();
      const filteredSchedules = response.filter((schedule: Schedule) => !schedule.jobstatus);
      setSchedules(filteredSchedules);
    } catch (err) {
      setError('Failed to fetch schedules');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [userId]);

  const handleUpdateJobStatus = async () => {
    if (selectedSchedule && selectedSchedule._id) {
      try {
        await ScheduleService.updateSchedule(selectedSchedule._id, { jobstatus: true });
        setSchedules(schedules.map(s => s._id === selectedSchedule._id ? { ...s, jobstatus: true } : s));
        closeModal();
      } catch (error) {
        console.error('Error updating job status:', error);
      }
    } else {
      console.error("Schedule ID is undefined or null.");
    }
  };
  

  const openModal = (schedule: Schedule) => {
    setSelectedSchedule(schedule);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedSchedule(null);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Pending Waste Schedules</h2>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && schedules.length === 0 && (
        <p className="text-center text-gray-600">No pending schedules found.</p>
      )}

      <div className="flex flex-col space-y-4">
        {schedules.map((schedule) => (
          <div
            key={schedule._id}
            className="bg-white p-4 rounded-lg shadow-lg flex flex-col md:flex-row justify-between items-center"
          >
            <div className="text-gray-700 w-full md:w-auto">
              <p><strong>Name:</strong> {schedule.fname} {schedule.lname}</p>
              <p><strong>Email:</strong> {schedule.email}</p>
              <p><strong>Area:</strong> {schedule.area}</p>
              <p><strong>Resident ID:</strong> {schedule.residenceID}</p>
              <p><strong>Time Slot:</strong> {schedule.timeslot}</p>
              <p><strong>Description:</strong> {schedule.description}</p>
              <p><strong>Job Status:</strong> {schedule.jobstatus ? 'Completed' : 'Pending'}</p>
            </div>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mt-4 md:mt-0 md:ml-4"
              onClick={() => openModal(schedule)}
            >
              Mark as Completed
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedSchedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Mark Schedule as Completed</h3>
            <p>Are you sure you want to mark the schedule for {selectedSchedule.fname} {selectedSchedule.lname} as completed?</p>
            <div className="flex justify-end mt-6">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleUpdateJobStatus}
              >
                Yes, Mark as Completed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule_Satus_Admin;

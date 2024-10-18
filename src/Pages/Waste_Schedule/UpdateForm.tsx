import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ScheduleService } from '../../Services/ScheduleService'; // Import your ScheduleService

interface Schedule {
  _id?: string;
  fname: string;
  lname: string;
  mobile: string;
  email: string;
  cdate: string;

  area:string;

  timeslot: string;
  description: string;
  type: string;
}

const UpdateForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id)
  const navigate = useNavigate();

  const [schedule, setSchedule] = useState<Schedule>({
    _id: "",
    fname: "",
    lname: "",
    mobile: "",
    email: "",
    cdate: "",

    area:"",

    timeslot: "",
    description: "",
    type: "",
  });

  
  const fetchSchedule = async () => {
    if (!id) {
      console.error("ID is undefined");
      return;
    }

    try {
      const response = await ScheduleService.fetchScheduleById(id); 
      setSchedule(response);
      console.log("Fetched schedule:", response); 
    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [id]);

  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSchedule({ ...schedule, [name]: value });
  };

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schedule._id) {
      console.error("ID is undefined");
      return;
    }

    try {
      await ScheduleService.updateSchedule(schedule._id, schedule); 
      alert("Schedule updated successfully!");
      navigate("/view");
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="flex justify-center items-center h-auto bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 lg:max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
          Update Schedule
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="fname"
              value={schedule.fname}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              type="text"
              name="lname"
              value={schedule.lname}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Mobile</label>
            <input
              type="tel"
              name="mobile"
              value={schedule.mobile}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={schedule.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Collection Date</label>
            <input
              type="date"
              name="cdate"
              value={schedule.cdate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              min={today}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Area</label>
            <select
              name="area"
              value={schedule.area}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select Area</option>
          <option value="Morning">Colombo</option>
          <option value="Afternoon">Kandy</option>
          <option value="Evening">Galle</option>
            </select>
          </div>



          <div className="mb-4">
            <label className="block text-gray-700">Timeslot</label>
            <select
              name="timeslot"
              value={schedule.timeslot}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select timeslot</option>
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Waste Type</label>
            <select
              name="type"
              value={schedule.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select waste type</option>
              <option value="Organic">Organic</option>
              <option value="Recyclable">Recyclable</option>
              <option value="Hazardous">Hazardous</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={schedule.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Update Schedule
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateForm;

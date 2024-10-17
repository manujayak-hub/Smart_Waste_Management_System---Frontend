import React, { useState, useEffect } from "react";
import { ScheduleService } from "../../Services/ScheduleService";
import { useFetchUser } from "../../Hooks/GetUserID";
import { TypeService, Type } from "../../Services/TypeService";

const ScheduleForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    mobile: "",
    email: "",
    cdate: "",
    area: "",
    timeslot: "",
    type: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { residenceId, userId } = useFetchUser();
  const [wasteTypes, setWasteTypes] = useState<Type[]>([]); // State to store fetched waste types

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // Fetch the waste types from backend
    const fetchWasteTypes = async () => {
      try {
        const types = await TypeService.fetchAllTypes();
        setWasteTypes(types); // Set the fetched waste types
      } catch (err) {
        console.error("Error fetching waste types:", err);
        setError("Failed to fetch waste types.");
      }
    };

    fetchWasteTypes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await ScheduleService.createSchedule({
        ...formData,
        jobstatus: false,
        userid: userId || "",
        _id: "",
        residenceID: residenceId || "",
      });

      setSuccess("Schedule created successfully!");
      setFormData({
        fname: "",
        lname: "",
        mobile: "",
        email: "",
        cdate: "",
        area: "",
        timeslot: "",
        type: "",
        description: "",
      });
    } catch (error: any) {
      setError(error.response?.data?.error || "Error submitting form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-green-600 py-4 flex items-center justify-between px-4">
        <button className="text-white focus:outline-none">&#9776;</button>
        <h2 className="text-white text-2xl font-bold text-center flex-grow">
          Waste Collection Scheduling
        </h2>
        <div className="w-8"></div>
      </div>

      <div className="flex justify-center items-center h-auto bg-gray-100 overflow-auto">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
          Create Waste Collection Schedule
        </h2>
      </div>

      <div className="flex justify-center items-center h-auto bg-gray-100 overflow-auto">
        <form
          className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 lg:max-w-md"
          onSubmit={handleSubmit}
        >
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">{success}</p>
          )}

          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              name="fname"
              value={formData.fname}
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
              value={formData.lname}
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
              value={formData.mobile}
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
              value={formData.email}
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
              value={formData.cdate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Area</label>
            <select
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select Area</option>
              <option value="colombo">Colombo</option>
              <option value="kandy">Kandy</option>
              <option value="galle">Galle</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Timeslot</label>
            <select
              name="timeslot"
              value={formData.timeslot}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="">Select timeslot</option>
              <option value="8:00 AM - 9:00 AM">8:00 AM - 9:00 AM</option>
              <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
              <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
              <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
              <option value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM</option>
              <option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option>
              <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
              <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
              <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Waste Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
               <option value="">Select waste type</option>
              {/* Dynamically render waste types */}
              {wasteTypes.map((type) => (
                <option key={type.wastetype} value={type.wastetype}>
                  {type.typedescription}
                </option>
              ))}
            
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ScheduleForm;

import React, { useState, useEffect } from "react";
import { ScheduleService } from "../../Services/ScheduleService";
import { useFetchUser } from "../../Hooks/GetUserID";
import { TypeService, Type } from "../../Services/TypeService";
import WasteCollecteHeader from '../../Components/waste_collecte_header'
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

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

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;

    if (formData.fname.length < 3) {
      setError("First name must be at least 3 characters.");
      return false;
    }

    if (formData.lname.length < 3) {
      setError("Last name must be at least 3 characters.");
      return false;
    }

    if (!mobileRegex.test(formData.mobile)) {
      setError("Invalid mobile number. Must be 10 digits.");
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      setError("Invalid email address.");
      return false;
    }

    if (!formData.cdate || new Date(formData.cdate) < new Date()) {
      setError("Please select a valid collection date.");
      return false;
    }

    if (formData.description.length < 10) {
      setError("Description must be at least 10 characters.");
      return false;
    }

    setError("");
    return true;
  };

  useEffect(() => {
    
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

    if (!validateForm()) {
      setLoading(false);
      return;
    }
    
    try {
      await ScheduleService.createSchedule({
        ...formData,
        jobstatus: false,
        userid: userId || "",
        residenceID: residenceId || ""
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

  const today = new Date().toISOString().split('T')[0];
  return (
    <>
    <Navbar/>
<WasteCollecteHeader/>
      <div className=" mt-6 mb-6 flex justify-center items-center ">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
          Create Waste Collection Schedule
        </h2>
      </div>

      <div className="flex justify-center items-center h-auto w-auto  overflow-auto">
      
        <form
          className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 lg:max-w-md xl:w-1/3 mx-auto mt-8 mb-12"
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
              min={today}
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
              
          <option value="Colombo">Colombo</option>
          <option value="Kandy">Kandy</option>
          <option value="Gampaha">Gampaha</option>
          <option value="Galle">Galle</option>
          <option value="Malabe">Malabe</option>

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
                  {type.wastetype}
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
          <div className="mt-6 mb-6">

        </div>
        </form>
        
      </div>
      <Footer/>
    </>
  );
};

export default ScheduleForm;

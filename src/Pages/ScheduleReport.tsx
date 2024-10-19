import React, { useState } from 'react';
import jsPDF from 'jspdf';
import baseURL from '../Hooks/BaseUrl'; // Import your base URL

const ScheduleReport: React.FC = () => {
    const [area, setArea] = useState('');
    const [schedules, setSchedules] = useState<any[]>([]);

    const areas = [
        'Colombo', 'Gampaha', 'Galle', 'Malabe'
      ];

    // Fetch schedules by area
    const fetchSchedules = async () => {
        try {
            const response = await baseURL.get(`/reports/schedules?area=${area}`);
            setSchedules(response.data);
        } catch (error) {
            console.error('Error fetching schedules:', error);
        }
    };

  // Handle PDF download
const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('Schedule Report', 10, 10);
    doc.setFontSize(12);
    doc.setTextColor(100);

    // Starting y position
    let yOffset = 30;

    schedules.forEach((schedule, index) => {
        // Draw a line separator
        doc.line(10, yOffset - 10, 200, yOffset - 10);
        
        // Schedule details
        doc.text(`Schedule ${index + 1}`, 10, yOffset);
        doc.setFontSize(11);
        doc.setTextColor(50);
        
        const lines = [
            `Name: ${schedule.fname} ${schedule.lname}`,
            `Contact No: ${schedule.mobile}`,
            `Email: ${schedule.email}`,
            `Area: ${schedule.area}`,
            `Timeslot: ${schedule.timeslot}`,
            `Type: ${schedule.type}`,
            `Description: ${schedule.description}`
        ];

        lines.forEach((line) => {
            const splitText = doc.splitTextToSize(line, 190); // Split text to fit within the PDF width
            splitText.forEach((txtLine: string) => { // Explicitly define the type as string
                doc.text(txtLine, 10, yOffset += 10); // Adjust vertical spacing here
            });
            yOffset += 5; // Add some extra space after each schedule
        });

        // Move yOffset for the next schedule
        yOffset += 20; // Add space before the next schedule
    });

    doc.save('schedules_report.pdf');
};

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Schedule Report</h2>
            <div className="mb-4">
                <label htmlFor="area" className="block text-sm font-medium text-gray-700">
                    Enter Area:
                </label>
                <select
                    id="area"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    <option value="" disabled>Select area</option>
                    {areas.map((m, index) => (
                        <option key={index} value={m}>
                        {m}
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex space-x-4 mb-4">
                <button
                    onClick={fetchSchedules}
                   className="w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800"
                >
                    Search
                </button>
                <button
                    onClick={handleDownload}
                    disabled={schedules.length === 0}
                    className={`w-full ${schedules.length === 0 ? 'bg-black' : 'bg-black'} text-white font-semibold py-2 rounded-lg shadow hover:${schedules.length === 0 ? 'bg-gray-400' : 'bg-green-600'} transition duration-200`}
                >
                    Download PDF
                </button>
            </div>
            <div>
                {schedules.length > 0 ? (
                    schedules.map((schedule, index) => (
                        <div key={index} className="border border-gray-300 p-4 rounded-lg mb-2">
                            <h3 className="font-semibold text-lg">Schedule {index + 1}</h3>
                            <p className="text-gray-700"><strong>Name:</strong> {schedule.fname} {schedule.lname}</p>
                            <p className="text-gray-700"><strong>Contact No:</strong> {schedule.mobile}</p>
                            <p className="text-gray-700"><strong>Email:</strong> {schedule.email}</p>
                            <p className="text-gray-700"><strong>Area:</strong> {schedule.area}</p>
                            <p className="text-gray-700"><strong>TimeSlot:</strong> {schedule.timeslot}</p>
                            <p className="text-gray-700"><strong>Type:</strong> {schedule.type}</p>
                            <p className="text-gray-700"><strong>Description:</strong> {schedule.description}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No schedules found for this area.</p>
                )}
            </div>
        </div>
    );
};

export default ScheduleReport;

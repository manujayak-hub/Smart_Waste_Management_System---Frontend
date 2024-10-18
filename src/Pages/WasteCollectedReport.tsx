import React, { useState } from 'react';
import jsPDF from 'jspdf';
import baseURL from '../Hooks/BaseUrl'; // Import your base URL


// List of months
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WasteCollectionReportPage: React.FC = () => {
  const [month, setMonth] = useState('');  // For storing the selected month
  const [wasteCollected, setWasteCollected] = useState<any[]>([]);  // Store fetched waste data
  const [loading, setLoading] = useState(false);  // Loading state

  // Function to fetch waste collection data
  const fetchWasteCollected = async () => {
    if (!month) {
      alert("Please select a month.");
      return;
    }
    
    setLoading(true);
    try {
      const response = await baseURL.get(`/reports/waste-collected?month=${month}`);
      setWasteCollected(response.data);
    } catch (error) {
      console.error('Error fetching waste collection data:', error);
      alert('Error fetching data. Please try again.');
    }
    setLoading(false);
  };

  // Function to generate and download the waste report as a PDF
  // Function to generate and download the waste report as a PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Waste Collected Report', 10, 10);
    doc.setFontSize(12);
    doc.text(`Month: ${month}`, 10, 20);
    doc.setFontSize(10);
    
    // Table Header
    const headers = ['Residence ID', 'Collection Date', 'Waste Type', 'Amount Collected (kg)', 'Collector Name'];
    const startY = 30; // Initial Y position for the table
    const cellWidth = 40; // Width of each cell
    const rowHeight = 10; // Height of each row
    
    // Draw headers
    headers.forEach((header, index) => {
        doc.text(header, index * cellWidth + 10, startY);
    });

    // Draw each waste entry
    wasteCollected.forEach((waste, index) => {
        const offsetY = startY + rowHeight + index * rowHeight;
        doc.text(waste.residenceId, 10, offsetY);
        doc.text(new Date(waste.collectionDate).toLocaleDateString(), 10 + cellWidth, offsetY);
        doc.text(waste.wasteType, 10 + cellWidth * 2, offsetY);
        doc.text(waste.amountCollected.toString(), 10 + cellWidth * 3, offsetY);
        doc.text(waste.collectorName, 10 + cellWidth * 4, offsetY);
    });

    // Add footer
    doc.setFontSize(8);
    doc.text('Generated on: ' + new Date().toLocaleString(), 10, startY + wasteCollected.length * rowHeight + 10);
    
    doc.save(`waste_collected_report_${month}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Waste Collected Report</h2>

      {/* Month Selector */}
      <div className="mb-4">
        <label htmlFor="month" className="block text-sm font-medium text-gray-700">
          Select Month:
        </label>
        <select
          id="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="">-- Select a Month --</option>
          {months.map((monthName) => (
            <option key={monthName} value={monthName}>
              {monthName}
            </option>
          ))}
        </select>
      </div>

      {/* Search and Download Buttons */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={fetchWasteCollected}
          disabled={loading}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200"
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
        <button
          onClick={handleDownloadPDF}
          disabled={wasteCollected.length === 0}
          className={`w-full ${wasteCollected.length === 0 ? 'bg-gray-400' : 'bg-green-500'} text-white font-semibold py-2 rounded-lg shadow hover:${wasteCollected.length === 0 ? 'bg-gray-400' : 'bg-green-600'} transition duration-200`}
        >
          Download PDF
        </button>
      </div>

      {/* Display Fetched Data */}
      {wasteCollected.length > 0 && (
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Residence ID</th>
              <th className="border border-gray-300 p-2">Collection Date</th>
              <th className="border border-gray-300 p-2">Waste Type</th>
              <th className="border border-gray-300 p-2">Amount Collected (kg)</th>
              <th className="border border-gray-300 p-2">Collector Name</th>
            </tr>
          </thead>
          <tbody>
            {wasteCollected.map((waste, index) => (
              <tr key={index}>
                <td className="border border-gray-300 p-2">{waste.residenceId}</td>
                <td className="border border-gray-300 p-2">{new Date(waste.collectionDate).toLocaleDateString()}</td>
                <td className="border border-gray-300 p-2">{waste.wasteType}</td>
                <td className="border border-gray-300 p-2">{waste.amountCollected} kg</td>
                <td className="border border-gray-300 p-2">{waste.collectorName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {wasteCollected.length === 0 && !loading && (
        <p className="text-gray-500 text-center">No waste collection data available for this month.</p>
      )}
    </div>
  );
};

export default WasteCollectionReportPage;

// src/components/WasteCollectedReport.tsx

import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const WasteCollectedReport: React.FC = () => {
    const [month, setMonth] = useState('');
    const [wasteCollected, setWasteCollected] = useState<any[]>([]);

    const fetchWasteCollected = async () => {
        const response = await axios.get(`/api/reports/waste-collected?month=${month}`);
        setWasteCollected(response.data);
    };

    const handleDownload = () => {
        const doc = new jsPDF();
        doc.text('Waste Collected Report', 10, 10);
        wasteCollected.forEach((waste, index) => {
            doc.text(`Waste ${index + 1}: ${JSON.stringify(waste)}`, 10, 20 + index * 10);
        });
        doc.save('waste_collected_report.pdf');
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Waste Collected Report</h2>
            <div className="mb-4">
                <label htmlFor="month" className="block text-sm font-medium text-gray-700">
                    Select Month:
                </label>
                <input
                    type="month"
                    id="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
            </div>
            <div className="flex space-x-4 mb-4">
                <button
                    onClick={fetchWasteCollected}
                    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200"
                >
                    Search
                </button>
                <button
                    onClick={handleDownload}
                    disabled={wasteCollected.length === 0}
                    className={`w-full ${wasteCollected.length === 0 ? 'bg-gray-400' : 'bg-green-500'} text-white font-semibold py-2 rounded-lg shadow hover:${wasteCollected.length === 0 ? 'bg-gray-400' : 'bg-green-600'} transition duration-200`}
                >
                    Download PDF
                </button>
            </div>
            <div>
                {wasteCollected.length > 0 ? (
                    wasteCollected.map((waste, index) => (
                        <div key={index} className="border border-gray-300 p-4 rounded-lg mb-2">
                            <p className="text-gray-700">{JSON.stringify(waste)}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No waste collected data available for this month.</p>
                )}
            </div>
        </div>
    );
};

export default WasteCollectedReport;

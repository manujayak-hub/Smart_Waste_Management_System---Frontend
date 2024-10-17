import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';

const PaymentReport: React.FC = () => {
    const [month, setMonth] = useState('');
    const [payments, setPayments] = useState<any[]>([]);

    // Fetch payments by month
    const fetchPayments = async () => {
        try {
            const response = await axios.get(`/api/reports/payments?month=${month}`);
            setPayments(response.data);
        } catch (error) {
            console.error('Error fetching payments:', error);
        }
    };

    // Handle PDF download
    const handleDownload = () => {
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('Payment Report', 10, 10);
        doc.setFontSize(12);
        
        // Starting y position
        let yOffset = 30;

        payments.forEach((payment, index) => {
            // Payment details
            doc.text(`Payment ${index + 1}:`, 10, yOffset);
            doc.setFontSize(11);
            doc.setTextColor(50);

            const lines = [
                `ID: ${payment.id}`,
                `Amount: ${payment.amount}`,
                `Date: ${payment.date}`,
                `Status: ${payment.status}`,
                `Method: ${payment.method}`,
                `Description: ${payment.description}`
            ];

            lines.forEach((line) => {
                const splitText = doc.splitTextToSize(line, 190); // Split text to fit within the PDF width
                splitText.forEach((txtLine: string) => {
                    doc.text(txtLine, 10, yOffset += 10); // Adjust vertical spacing here
                });
                yOffset += 5; // Add some extra space after each payment
            });

            // Move yOffset for the next payment
            yOffset += 20; // Add space before the next payment
        });

        doc.save('payments_report.pdf');
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Payment Report</h2>
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
                    onClick={fetchPayments}
                    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200"
                >
                    Search
                </button>
                <button
                    onClick={handleDownload}
                    disabled={payments.length === 0}
                    className={`w-full ${payments.length === 0 ? 'bg-gray-400' : 'bg-green-500'} text-white font-semibold py-2 rounded-lg shadow hover:${payments.length === 0 ? 'bg-gray-400' : 'bg-green-600'} transition duration-200`}
                >
                    Download PDF
                </button>
            </div>
            <div>
                {payments.length > 0 ? (
                    payments.map((payment, index) => (
                        <div key={index} className="border border-gray-300 p-4 rounded-lg mb-2">
                            <p className="text-gray-700">{JSON.stringify(payment)}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No payments found for this month.</p>
                )}
            </div>
        </div>
    );
};

export default PaymentReport;

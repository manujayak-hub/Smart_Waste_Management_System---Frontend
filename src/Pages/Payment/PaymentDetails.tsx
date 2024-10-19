// src/components/PaymentDetails.tsx
import React, { useEffect, useState } from 'react';
import { UserPaymentServcie } from '../../Services/UserPayment';
import { useParams } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

interface UserPayment {
    _id: string;
    userId: string;
    totalAmount: string;
    paymentStatus: string;
    createdAt: string;
}

const PaymentDetails: React.FC = () => {
    const [payments, setPayments] = useState<UserPayment[]>([]);
    const { userId } = useParams<{ userId: string }>(); // Use to get userId from URL

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const userPayments = await UserPaymentServcie.fetchAllUserPayment();
                const filteredPayments = userPayments.filter(payment => payment.userId === userId);
                setPayments(filteredPayments);
            } catch (error) {
                console.error("Error fetching payments:", error);
            }
        };

        fetchPayments();
    }, [userId]);

    return (
        <div className={`flex flex-col min-h-screen bg-green-50`}>
      <Navbar />
        <div className="p-4 bg-gray-100 min-h-screen flex flex-col items-center">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Payment Details</h3>
                <table className="min-w-full bg-white divide-y divide-gray-200">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Date</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Total Amount</th>
                            <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Payment Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {payments.length > 0 ? (
                            payments.map(payment => (
                                <tr key={payment._id}>
                                    <td className="py-3 px-4 text-sm text-gray-500">{new Date(payment.createdAt).toLocaleDateString()}</td>
                                    <td className="py-3 px-4 text-lg text-green-600">${parseFloat(payment.totalAmount).toLocaleString()}</td>
                                    <td className={`py-3 px-4 text-lg ${payment.paymentStatus === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>
                                        {payment.paymentStatus}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3} className="py-3 px-4 text-sm text-gray-500 text-center">No payments found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
        <Footer/>
        </div>
    );
};

export default PaymentDetails;

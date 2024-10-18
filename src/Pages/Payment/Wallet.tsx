import React, { useEffect, useState } from 'react';
import { PaymentService } from '../../Services/PaymentSevice';
import { UserService } from '../../Services/UserService';
import { FaMoneyBillAlt, FaHistory } from 'react-icons/fa'; // Icons
import { UserPaymentServcie } from '../../Services/UserPayment';
import { useNavigate } from 'react-router-dom';

interface Payment {
  _id: string;
  userId: string;
  fname: string;
  lname: string;
  paybackFee: number;
  totalBill: number;
  status: string;
  date: string;
}

interface Userpayment {
  _id: string;
  userId: string;
  totalAmount: string;
  paymentStatus: string;
  createdAt: string;
}

const Wallet: React.FC = () => {
  const [uid, setUid] = useState<string | null>(null); // Store user ID
  const [balance, setBalance] = useState<number>(0);
  const [totalbill, setTotalBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Userpayment[]>([]);
  const [fname, setFname] = useState<string>(''); 
  const [lname, setLname] = useState<string>('');
  const navigate = useNavigate(); 

  useEffect(() => {
    // Retrieve the token from local storage
    const token = localStorage.getItem("token");

    if (token) {
      const fetchUserDetails = async () => {
        try {
          const userResponse = await UserService.fetchUser(token); // Fetch user details using the token
          console.log('User Response:', userResponse);
          setUid(userResponse._id); // Store user ID
        } catch (err) {
          console.error('Error fetching user details:', err);
        }
      };

      fetchUserDetails();
    } else {
      console.log("No token found, please log in.");
    }
  }, []); // Empty dependency array ensures this runs on component mount

  useEffect(() => {
    const fetchPayments = async () => {
      if (uid) {
        try {
          // Fetch all payments for the current user
          const payments = await PaymentService.fetchAllPayments();
          const userPayments = payments.filter((payment) => payment.userId === uid);
          
          // Calculate balance based on paybackFee
          const totalBalance = userPayments.reduce((sum, payment) => sum + payment.paybackFee, 0);
          const totalBill = userPayments.reduce((sum, payment) => sum + payment.totalBill, 0);
          setTotalBalance(totalBill);
          setBalance(totalBalance);
          // Set transaction history

          if (userPayments.length > 0) {
            setFname(userPayments[0].fname);
            setLname(userPayments[0].lname);
          }
        } catch (error) {
          console.error("Error fetching payments:", error);
        }
      }
    };

    fetchPayments();
  }, [uid]); // Fetch payments when uid changes
  useEffect(() => {
    const fetchPayments = async () => {
      if (uid) {
        try {
          // Fetch all payments for the current user
          const payments = await UserPaymentServcie.fetchAllUserPayment();
          const userPayments = payments.filter((payment) => payment.userId === uid);
          setTransactions(userPayments);
         
        } catch (error) {
          console.error("Error fetching payments:", error);
        }
      }
    };

    fetchPayments();
  }, [uid]); // Fetch 

  const checkout = async () => {
    try {
        const res = await fetch("http://localhost:8000/api/userpay/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({
              userId: uid,
                items: [
                    {
                        id: 1, 
                        price: totalbill, 
                        name: fname, 
                    },
                ]
            })
        });
        const data = await res.json();
        window.location = data.url; // Redirect to the Stripe Checkout URL
    } catch (error) {
        console.log(error);
    }
};

const goToPaymentDetails = () => {
  if (uid) {
      navigate(`/payment-details/${uid}`); // Navigate to payment details page
  }
};
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-4 mb-6">
        {/* User Info */}
        <div className="text-center mb-4">
          <h2 className="text-lg font-semibold text-green-700">Hello, {fname}</h2>
          <p className="text-gray-500">My Wallet</p>
        </div>

        {/* Balance Display */}
        <div className="bg-green-100 p-4 rounded-lg shadow-md">
          <p className="text-sm text-gray-600">BALANCE</p>
          <h1 className="text-3xl font-bold text-green-600">${balance.toLocaleString()}</h1>
          <p className="text-sm text-gray-500 mt-2">Account Name: {fname} {lname}</p>
          <p className="text-sm text-gray-500 mt-2">Monthly Bill: {totalbill}</p>
        </div>

        {/* Payment and Details Buttons */}
        <div className="flex justify-between mt-6">
          <button onClick={checkout} className="bg-green-500 text-white py-2 px-4 rounded-lg flex items-center">
            <FaMoneyBillAlt className="mr-2" /> Payment
          </button>
          <button onClick={goToPaymentDetails} className="bg-gray-500 text-white py-2 px-4 rounded-lg flex items-center">
            <FaHistory className="mr-2" /> Payment Details
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction History</h3>
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction._id} className="flex justify-between items-center mb-4 p-4 border-b">
              <div>
                <p className="text-sm text-gray-500">{transaction.createdAt}</p>
              </div>
              <p className="text-lg text-green-600">{transaction.totalAmount}</p>
              <p className="text-lg text-green-600">{transaction.paymentStatus}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Wallet;

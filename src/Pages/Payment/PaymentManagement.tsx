import React, { useState, useEffect } from 'react';
import { PaymentService, Payment } from '../../Services/PaymentSevice';
import { UserService } from '../../Services/UserService';
import Modal from '../../Components/Model'; // Adjust import path as necessary
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import styles

const PaymentManagement: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [flatFee, setFlatFee] = useState<number>(0);
  const [paybackFee, setPaybackFee] = useState<number>(0);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    loadPayments();
    loadUsers();
  }, []);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const data = await PaymentService.fetchAllPayments();
      setPayments(data);
    } catch (err) {
      showError('Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    try {
      const userData = await UserService.fetchAllUsers();
      setUsers(userData);
    } catch (err) {
      showError('Failed to load users');
    }
  };

  const showError = (message: string) => {
    setError(message);
    toast.error(message); // Show error toast
  };

  const showSuccess = (message: string) => {
    toast.success(message); // Show success toast
  };

  const handleAddPayment = async () => {
    const existingPayment = payments.find(payment => 
      payment.fname === selectedUser?.fname && payment.lname === selectedUser?.lname
    );

    if (existingPayment) {
      showError('This user already has a payment entry.');
      window.location.reload(); // Reload the page
      return;
    }

    const totalBill = flatFee + paybackFee;

    const newPayment: Payment = {
      _id: editingPayment ? editingPayment._id : '',
      userId: selectedUser?._id || '',
      fname: selectedUser.fname,
      lname: selectedUser.lname,
      flatFee,
      paybackFee,
      totalBill,
      status: 'pending',
      date: new Date().toISOString(),
    };

    try {
      if (editingPayment) {
        await PaymentService.updatePayment(editingPayment._id, newPayment);
        showSuccess('Payment updated successfully');
      } else {
        await PaymentService.createPayment(newPayment);
        showSuccess('Payment added successfully');
      }

      resetForm();
      loadPayments();
      setIsModalOpen(false); // Close the modal after adding/updating
    } catch (err) {
      showError('Failed to add/update payment');
    }
  };

  const resetForm = () => {
    setSelectedUser(null);
    setFlatFee(0);
    setPaybackFee(0);
    setEditingPayment(null);
    setError(null); // Clear errors on reset
  };

  const handleDeletePayment = async (id: string) => {
    try {
      await PaymentService.deletePayment(id);
      loadPayments();
      showSuccess('Payment deleted successfully');
    } catch (err) {
      showError('Failed to delete payment');
    }
  };

  const handleEditPayment = (payment: Payment) => {
    setEditingPayment(payment);
    setSelectedUser({ fname: payment.fname, lname: payment.lname });
    setFlatFee(payment.flatFee);
    setPaybackFee(payment.paybackFee);
    setIsModalOpen(true); // Open the modal for editing
  };

  return (
    <div className="p-5 md:p-10">
      <h1 className="text-2xl font-bold mb-5 text-center">Payment Management</h1>

      {loading ? (
        <p className="text-center">Loading payments...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <>
          <button
            className="mb-4 bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition w-full md:w-auto"
            onClick={() => {
              resetForm();
              setIsModalOpen(true); // Open the modal for adding a new payment
            }}
          >
            New User
          </button>

          <table className="table-auto w-full mb-5">
            <thead>
              <tr>
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Flat Fee</th>
                <th className="px-4 py-2">Payback Fee</th>
                <th className="px-4 py-2">Total Bill</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment._id}>
                  <td className="border px-4 py-2">{payment.fname}</td>
                  <td className="border px-4 py-2">{payment.lname}</td>
                  <td className="border px-4 py-2">{payment.status}</td>
                  <td className="border px-4 py-2">{payment.flatFee}</td>
                  <td className="border px-4 py-2">{payment.paybackFee}</td>
                  <td className="border px-4 py-2">{payment.totalBill}</td>
                  <td className="border px-4 py-2 flex justify-center">
                    <button
                      className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                      onClick={() => handleEditPayment(payment)}
                    >
                      Update
                    </button>
                    <button
                      className="p-2 bg-red-500 text-white rounded ml-2 hover:bg-red-600 transition"
                      onClick={() => handleDeletePayment(payment._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for Add/Update Payment */}
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingPayment ? 'Update Payment' : 'Add Payment'}>
            <select
              className="p-2 border rounded mb-2 w-full"
              value={selectedUser?.fname || ''}
              onChange={(e) => {
                const user = users.find(user => user.fname === e.target.value);
                setSelectedUser(user || null);
              }}
            >
              <option value="">Select User</option>
              {users.map(user => (
                <option key={user._id} value={user.fname}>
                  {user.fname} {user.lname}
                </option>
              ))}
            </select>

            <input
              className="p-2 border rounded mb-2 w-full"
              placeholder="Flat Fee"
              type="number"
              value={flatFee}
              onChange={(e) => setFlatFee(parseFloat(e.target.value))}
            />
            <input
              className="p-2 border rounded mb-2 w-full"
              placeholder="Payback Fee"
              type="number"
              value={paybackFee}
              onChange={(e) => setPaybackFee(parseFloat(e.target.value))}
            />
            <button
              className="p-2 bg-blue-500 text-white rounded w-full hover:bg-blue-600 transition"
              onClick={handleAddPayment}
            >
              {editingPayment ? 'Update Payment' : 'Add Payment'}
            </button>
          </Modal>
        </>
      )}
      <ToastContainer /> {/* Add ToastContainer here */}
    </div>
  );
};

export default PaymentManagement;

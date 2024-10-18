import baseURL from '../Hooks/BaseUrl';

export interface Payment {
  _id: string;
  userId: string;
  fname: string;
  lname: string;
  flatFee: number;
  paybackFee: number;
  totalBill: number; // Assuming totalBill is calculated based on flatFee and paybackFee
  status: string; // Add any additional fields as necessary
  date: string; 
}

export class PaymentService {
  static async fetchAllPayments(): Promise<Payment[]> {
    const response = await baseURL.get(`/api/payments/get`);
    return response.data;
  }

  static async createPayment(paymentData: Payment): Promise<Payment> {
    const response = await baseURL.post(`/api/payments/add`, paymentData);
    return response.data;
  }

  static async updatePayment(paymentId: string, updates: Partial<Payment>): Promise<Payment> {
    const response = await baseURL.put(`/api/payments/update/${paymentId}`, updates);
    return response.data;
  }

  static async deletePayment(paymentId: string): Promise<void> {
    await baseURL.delete(`/api/payments/delete/${paymentId}`);
  }

  static async fetchPaymentById(paymentId: string): Promise<Payment> {
    const response = await baseURL.get(`/api/payments/${paymentId}`); 
    return response.data;
  }
}

import baseURL from '../Hooks/BaseUrl';

export interface Userpayment {
    _id: string;
    userId: string;
    totalAmount: string;
    paymentStatus: string;
    createdAt: string;
}


export class UserPaymentServcie {

    static async fetchAllUserPayment(): Promise<Userpayment[]> {
        const response = await baseURL.get(`/api/userpay/get`);
        return response.data;
    }
}
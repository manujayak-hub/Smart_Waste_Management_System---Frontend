import baseURL from '../Hooks/BaseUrl';

export interface WasteRecord {
  _id: string;
  residenceId: string; // ID of the residence or building
  collectionDate: string; // Date of waste collection
  wasteType: string; // Type of waste (e.g., recyclable, organic, etc.)
  quantity: number; // Quantity of waste collected
  collectedBy: string; // Name or ID of the person who collected the waste
}

export class WasteCollectionService {
  // Fetch all waste collection records
  static async fetchAllWasteRecords(): Promise<WasteRecord[]> {
    const response = await baseURL.get('/wastecollection'); // Adjusted endpoint
    return response.data;
  }

  // Fetch waste collection records by residence/building ID
  static async fetchWasteRecordsByResidenceId(residenceId: string): Promise<WasteRecord[]> {
    const response = await baseURL.get(`/wastecollection/residence/${residenceId}`); // Adjusted endpoint
    return response.data;
  }

  // Fetch a specific waste collection record by ID
  static async fetchWasteRecordById(recordId: string): Promise<WasteRecord> {
    const response = await baseURL.get(`/wastecollection/${recordId}`); // Adjusted endpoint
    return response.data;
  }

  // Create a new waste collection record
  static async createWasteRecord(wasteData: WasteRecord): Promise<WasteRecord> {
    const response = await baseURL.post('/waste-collection/create', wasteData); // Adjusted endpoint
    return response.data;
  }

  // Update a waste collection record by ID
  static async updateWasteRecord(recordId: string, updates: Partial<WasteRecord>): Promise<WasteRecord> {
    const response = await baseURL.put(`/WasteCollection/${recordId}`, updates); // Adjusted endpoint
    return response.data;
  }

  // Delete a waste collection record by ID
  static async deleteWasteRecord(recordId: string): Promise<void> {
    await baseURL.delete(`/WasteCollection/${recordId}`); // Adjusted endpoint
  }
}

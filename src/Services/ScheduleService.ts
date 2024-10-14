
import baseURL from '../Hooks/BaseUrl';

export interface Schedule {
  _id: string;
  fname: string;
  lname: string;
  mobile: string;
  email: string;
  cdate: string;
  timeslot: string;
  jobstatus: boolean;
  type: string;
  description: string;
  userid: string; // You may want to include this if needed
}

export class ScheduleService {
  // Fetch all schedules (not user-specific)
  static async fetchAllSchedules(): Promise<Schedule[]> {
    const response = await baseURL.get(`/schedule/view`);
    return response.data;
  }

  // Fetch schedules by user ID
  static async fetchSchedulesByUserId(userId: string): Promise<Schedule[]> {
    const response = await baseURL.get(`/schedule/user/${userId}`);
    return response.data;
  }

  // Create a new schedule
  static async createSchedule(scheduleData: Schedule): Promise<Schedule> {
    const response = await baseURL.post(`/schedule/create`, scheduleData);
    return response.data;
  }

  // Update a schedule by ID
  static async updateSchedule(scheduleId: string, updates: Partial<Schedule>): Promise<Schedule> {
    const response = await baseURL.put(`/schedule/${scheduleId}`, updates);
    return response.data;
  }

  // Delete a schedule by ID
  static async deleteSchedule(scheduleId: string): Promise<void> {
    await baseURL.delete(`/schedule/${scheduleId}`);
  }

  // Fetch a schedule by ID
  static async fetchScheduleById(scheduleId: string): Promise<Schedule> {
    const response = await baseURL.get(`/schedule/doc/${scheduleId}`);
    return response.data;
  }
}

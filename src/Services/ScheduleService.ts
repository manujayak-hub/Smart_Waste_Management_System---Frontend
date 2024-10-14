
import baseURL from '../Hooks/BaseUrl';

export interface Schedule {
  _id: string;
  fname: string;
  lname: string;
  mobile: string;
  email: string;
  cdate: string;
  area:string;
  timeslot: string;
  jobstatus: boolean;
  type: string;
  description: string;
  userid: string; 
}

export class ScheduleService {
  
  static async fetchAllSchedules(): Promise<Schedule[]> {
    const response = await baseURL.get(`/schedule/view`);
    return response.data;
  }

 
  static async fetchSchedulesByUserId(userId: string): Promise<Schedule[]> {
    const response = await baseURL.get(`/schedule/user/${userId}`);
    return response.data;
  }

  
  static async createSchedule(scheduleData: Schedule): Promise<Schedule> {
    const response = await baseURL.post(`/schedule/create`, scheduleData);
    return response.data;
  }

  
  static async updateSchedule(scheduleId: string, updates: Partial<Schedule>): Promise<Schedule> {
    const response = await baseURL.put(`/schedule/${scheduleId}`, updates);
    return response.data;
  }

 
  static async deleteSchedule(scheduleId: string): Promise<void> {
    await baseURL.delete(`/schedule/${scheduleId}`);
  }

  
  static async fetchScheduleById(scheduleId: string): Promise<Schedule> {
    const response = await baseURL.get(`/schedule/doc/${scheduleId}`);
    return response.data;
  }
}

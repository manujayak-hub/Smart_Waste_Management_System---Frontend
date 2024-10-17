
import baseURL from '../Hooks/BaseUrl';

export interface Type {
 
  wastetype:  string;
  typedescription:string;
}

export class TypeService {
  
  static async fetchAllTypes(): Promise<Type[]> {
    const response = await baseURL.get(`/Type/view`);
    return response.data;
  }
  
  static async createType(TypeData: Type): Promise<Type> {
    const response = await baseURL.post(`/Type/create`, TypeData);
    return response.data;
  }

  
}

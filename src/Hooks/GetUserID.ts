// hooks/useFetchUserId.ts
import { useState, useEffect } from 'react';
import { UserService } from '../Services/UserService';

export const useFetchUserId = () => {
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      (async () => {
        try {
          const user = await UserService.fetchUser(token);
          setUid(user._id);
        } catch (err) {
          console.error('Error fetching user details:', err);
        }
      })();
    } else {
      console.log("No token found, please log in.");
    }
  }, []);

  return uid;
};

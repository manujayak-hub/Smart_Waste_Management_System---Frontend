import { useState, useEffect } from 'react';
import { UserService } from '../Services/UserService'; // Adjust the import path if necessary

export const useFetchUser = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [fname, setFname] = useState<string | null>(null);
  const [lname, setLname] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [residenceId2, setResidenceId] = useState<string | null>(null);
  const [mobile, setMobile] = useState<string | null>(null);
  const [admintype, setAdmintype] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      (async () => {
        try {
          const user = await UserService.fetchUser(token);
          setUserId(user._id);
          setFname(user.fname);
          setLname(user.lname);
          setEmail(user.email);
          setResidenceId(user.residenceId);
          setMobile(user.mobile);
          setAdmintype(user.admintype);
        } catch (err) {
          console.error('Error fetching user details:', err);
          setError('Failed to fetch user details');
        }
      })();
    } else {
      console.log("No token found, please log in.");
      setError('No token found');
    }
  }, []);

  return {
    userId,
    fname,
    lname,
    email,
    residenceId2,
    mobile,
    admintype,
    error,
  };
};

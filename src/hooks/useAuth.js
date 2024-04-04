import { useState } from "react";
import api from './api'; 

const useAuth = () => {
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);

 const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/api/users/login', { email, password });
      setLoading(false);
      return res.data;
    } catch (err) {
      setLoading(false);
      throw err;
    }
 };

 const signup = async (name, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('/api/users/signup', { email, password, name });
      setLoading(false);
      return res.data;
    } catch (err) {
      setLoading(false);
      throw err;
    }
 };

 return { login, signup, loading, error };
};

export default useAuth;

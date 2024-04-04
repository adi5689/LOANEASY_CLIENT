// hooks/useCreateLoan.js
import { useState } from 'react';
import api from './api'; 
import { useAuthContext } from '../context/AuthContext';

const useCreateLoan = () => {
 const { currentUser } = useAuthContext();
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState(null);

 const createLoan = async (amount, term, repaymentFrequency) => {
    setLoading(true);
    setError(null);
    try {

        const token = localStorage.getItem('token');

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }

      const res = await api.post('/api/loans/createloan', {
        amount,
        term,
        repaymentFrequency,
        user: currentUser.id, 
      }, config);
      setLoading(false);
      return res.data;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
 };

 return { createLoan, loading, error };
};

export default useCreateLoan;

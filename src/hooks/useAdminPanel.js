import { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext'; 
import api from './api'; 

const useAdminPanel = () => {
    const { currentUser } = useAuthContext();
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAllLoans = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.get('/api/loans/all', {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
            setLoans(res.data);
        } catch (err) {
            if (err.response && err.response.status === 401) {
                // Handling unauthorized response
                localStorage.removeItem('token');
                // Redirect to login page
                window.location.href = '/login'; 
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const approveLoan = async (loanId) => {
        setLoading(true);
        setError(null);
        try {
            const res = await api.put(`/api/loans/${loanId}/approve`, {}, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentUser && currentUser.isAdmin) {
            fetchAllLoans();
        }
    }, [currentUser]);

    return { loans, loading, error, approveLoan };
};

export default useAdminPanel;

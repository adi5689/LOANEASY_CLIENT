import { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import useAuth from '../hooks/useAuth';
import api from "../hooks/api";
import { useContext } from 'react';

const AuthContext = createContext();

const getUserFromToken = async (token) => {
    try {
        const response = await api.get('/api/users/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('User data:', response.data); 
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user from token:', error);
        return null;
    }
};

export const AuthProvider = ({children}) => {
    const {login, signup, loading, error} = useAuth();
    const [currentUser, setCurrentUser] = useState(null);
    const [activeTab, setActiveTab] = useState('applyLoan');
    const navigate = useNavigate(); 

    const handleLogin = async (email, password) => {
        const user = await login(email, password);
        setCurrentUser(user);
        localStorage.setItem('token', user.token);
        if (user.isAdmin) {
            navigate('/admin');
        }
    };

    const handleSignup = async (name, email, password) => {
        try {
            const user = await signup(name, email, password);
            setCurrentUser(user); 
        } catch (err) {
            throw err; 
        }
    };

    const handleLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem('token');
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getUserFromToken(token).then(user => {
                if (user) {
                    setCurrentUser({ ...user, isAdmin: user.isAdmin });
                } else {
                    localStorage.removeItem('token');
                    setCurrentUser(null);
                }
            });
        } else {
            setCurrentUser(null);
        }
    }, []);
    

    return (
        <AuthContext.Provider value={{currentUser, handleLogin, handleSignup, handleLogout, loading, error, activeTab, setActiveTab }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);

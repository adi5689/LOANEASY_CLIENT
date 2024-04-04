import { Routes, Route, useNavigate } from 'react-router-dom';
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute';
import ApplyLoan from './component/ApplyLoan';
import AllLoans from './component/AllLoans';
import Auth from './component/Auth';
import PathNotFound from './component/pathNotFound';
import Header from './component/Header';
import AdminSection from './component/AdminSection';
import { useAuthContext } from './context/AuthContext';
import { useEffect } from 'react';


function App() {
    const { currentUser } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
           navigate('/login');
        } else if(currentUser.isAdmin){
            navigate('/admin');
        }
    }, [currentUser, navigate]);

    return (
        <Routes>
            <Route path="/login" element={<Auth />} />
            <Route path="/" element={
                <ProtectedRoute>
                    <Header />
                    <ApplyLoan />
                </ProtectedRoute>
            } />
            <Route path="/allloans" element={
                <ProtectedRoute>
                    <Header />
                    <AllLoans />
                </ProtectedRoute>
            } />
            <Route path='/admin' element={<AdminSection />}/>
            <Route path="*" element={<PathNotFound />} />
        </Routes>
    );
}

export default App;

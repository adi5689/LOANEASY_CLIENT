import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
 const { currentUser } = useAuthContext();

 if (!currentUser) {
    // Redirected to login page if the user is not logged in
    return <Navigate to="/login" />;
 }

 return children;
};

export default ProtectedRoute;

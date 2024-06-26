import { toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

const LoginFirst = () => {
    setTimeout(() => {
        toast.warn("Please login first", {
            position: "top-center",
            autoClose: 2000
        });
    }, 10);
    
    return <Navigate to="/blogs/login" />;
};

export default LoginFirst;

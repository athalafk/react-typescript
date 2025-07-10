import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = (): boolean => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  return isAuthenticated;
};

export default useAuth;
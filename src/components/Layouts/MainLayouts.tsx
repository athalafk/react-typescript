import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import Navbar from '@/components/Layouts/Navbar'
import Notification from '@/components/Elements/Notification'
import useAuth from '@/hooks/useAuth'
import { Box, Container } from '@mui/material'

const MainLayout = () => {
    const isAuthenticated = useAuth();
    const { message, type } = useSelector((state: RootState) => state.notification);

    if (!isAuthenticated) {
        return null; 
    }
    
    return (
        <Box>
            <Navbar />
            <Notification message={message} type={type} />
            <Container component="main" maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Outlet />
            </Container>
        </Box>
    );
};

export default MainLayout;
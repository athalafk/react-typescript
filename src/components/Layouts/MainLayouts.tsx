import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import Navbar from 'src/components/Layouts/Navbar'
import Notification from 'src/components/Elements/Notification'
import useAuth from 'src/hooks/useAuth'
import { Box, Container } from '@mui/material'
import { Helmet } from 'react-helmet-async'

const MainLayout = () => {
    const isAuthenticated = useAuth();
    const { message, type } = useSelector((state: RootState) => state.notification);

    if (!isAuthenticated) {
        return null; 
    }
    
    return (
        <>
        <Helmet>
            <title>Products | TokoSaya</title>
            <meta name="description" content="Browse our wide selection of products." />
        </Helmet>
        <Box>
            <Navbar />
            <Notification message={message} type={type} />
            <Container component="main" maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                <Outlet />
            </Container>
        </Box>
        </>
    );
};

export default MainLayout;
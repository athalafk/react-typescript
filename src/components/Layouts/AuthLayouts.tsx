import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography, Link } from '@mui/material';

interface AuthLayoutProps {
    children: ReactNode;
    title: string;
}

const AuthLayout = ({ children, title }: AuthLayoutProps) => {
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5" color="primary sx={{ fontweight: bold }}">
                    {title}
                </Typography>
                <Typography component="p" color="text.secondary" sx={{ mb: 3, mt: 1 }}>
                    Welcome, Please enter your credentials below.
                </Typography>
                {children}
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                    {title === 'Login' ? "Don't have an account? " : "Already have an account? "}
                    <Link component={RouterLink} to={title === 'Login' ? '/register' : '/login'} variant="body2">
                    {title === 'Login' ? 'Register here' : 'Login here'}
                    </Link>
                </Typography>
            </Box>
        </Container>
    )
}

export default AuthLayout;
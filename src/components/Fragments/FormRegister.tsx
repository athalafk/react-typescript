import { TextField, Box } from '@mui/material';
import Button from "@/components/Elements/Button";

const FormRegister = () => {
    return (
        <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="fullname"
                label="Full Name"
                name="fullname"
                autoComplete="name"
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
            />
            <Button
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
            >
                Register
            </Button>
        </Box>
    );
};

export default FormRegister;
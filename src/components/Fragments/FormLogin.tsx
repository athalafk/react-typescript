  import { FormEvent } from 'react';
  import { useNavigate } from 'react-router-dom';
  import { loginUser } from 'src/api/auth';
  import { useMutation } from '@tanstack/react-query';
  import { TextField, Box, Alert } from '@mui/material';
  import { LoginCredentials } from 'src/types';
  import Button from 'src/components/Elements/Button';

  const FormLogin = () => {
    const navigate = useNavigate();

    const mutation = useMutation({
      mutationFn: loginUser,
      onSuccess: (data, variables) => {
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token);
        // localStorage.setItem("token_type", data.token_type);
        localStorage.setItem("username", variables.username || ''); 
        navigate("/products");
      },
      onError: (er) => {
        if (er instanceof Error) {
          console.error("Login failed:", er.message);
        }
      }
    });

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const target = e.target as typeof e.target & {
        username: { value: string };
        password: { value: string };
      };
      const credentials: LoginCredentials = {
        username: target.username.value,
        password: target.password.value,
      };
      mutation.mutate(credentials);
    };

    return (
      <Box component="form" onSubmit={handleLogin} sx={{ mt:1 }}>
        {mutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {mutation.error.message || "Login failed. Please try again."}
          </Alert>
        )}
        <TextField
          margin='normal'
          required
          fullWidth
          autoFocus
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id="password"
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          isLoading={mutation.isPending}
        >
          Login
        </Button>
      </Box>
    );
  };

  export default FormLogin;
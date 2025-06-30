import { Snackbar, Alert } from '@mui/material';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error';
}

const Notification = ({ message, type = 'success' }: NotificationProps) => {
  if (!message) {
    return null;
  }

  return (
    <Snackbar
      open={!!message}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      sx={{ top: '80px !important' }}
    >
      <Alert severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
import { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@tanstack/react-query';
import { logoutUser } from 'src/api/auth';
import {
  AppBar, Toolbar, Typography, Button, Menu, MenuItem, CircularProgress, Box, ListItemIcon, ListItemText
} from '@mui/material';

const Navbar = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isDropdownOpen = Boolean(anchorEl);
    const username = localStorage.getItem("username");

    const logoutMutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("token_type");
            localStorage.removeItem("username");
            navigate("/login");
        },
        onError: (error) => {
            console.error("Logout failed:", error);
        }
    });

    const handleClick = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logoutMutation.mutate();
        handleClose();
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                    TokoSaya
                </Typography>
                <Box>
                    <Button
                        color="inherit"
                        onClick={handleClick}
                        endIcon={<FontAwesomeIcon icon={faChevronDown} />}
                        sx={{ textTransform: 'capitalize' }}
                    >
                        {username}
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={isDropdownOpen}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleLogout} disabled={logoutMutation.isPending}>
                            <ListItemIcon>
                                {logoutMutation.isPending ? (
                                    <CircularProgress size={20} />
                                ) : (
                                    <FontAwesomeIcon icon={faRightFromBracket} style={{width: '20px'}}/>
                                )}
                            </ListItemIcon>
                            <ListItemText>{logoutMutation.isPending ? 'Logging out...' : 'Logout'}</ListItemText>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
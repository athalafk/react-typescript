import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { removeItem, clearCart } from "src/redux/features/cartSlice";
import { showNotification } from "src/redux/features/notificationSlice";
import { RootState, AppDispatch } from 'src/redux/store';
import { CartItem } from 'src/types';
import {
    Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton
} from '@mui/material';
import Button from 'src/components/Elements/Button';

const TableCart = () => {
    const dispatch: AppDispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.data);

    const totalPrice = useMemo(() => {
        console.log('Calculating total price');
        return cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    }, [cart]);

    const handleRemoveItem = (item: CartItem) => {
        dispatch(removeItem(item.id));
        dispatch(showNotification({
            message: `Removed "${item.title.substring(0, 20)}..." from cart`,
            type: 'error'
        }));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        dispatch(showNotification({
            message: "Cart has been cleared successfully",
            type: 'error'
        }));
    };

    return (
        <Paper elevation={3} sx={{ p: 2, width: '35%', ml: 2, alignSelf: 'flex-start' }}>
            <Typography variant="h5" color="primary" gutterBottom>
                Cart
            </Typography>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell align="center">Qty</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <Typography color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>Cart is empty</Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            cart.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell sx={{width: '40%'}}>{item.title}</TableCell>
                                    <TableCell>{`$${item.price.toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}`}</TableCell>
                                    <TableCell align="center">{item.qty}</TableCell>
                                    <TableCell align="right">
                                    {`$${(item.price * item.qty).toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}`}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" onClick={() => handleRemoveItem(item)} color="error">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                        {cart.length > 0 && (
                            <TableRow>
                                <TableCell colSpan={2}>
                                    <Button
                                        color="error"
                                        size="small"
                                        onClick={handleClearCart}
                                    >
                                        Clear Cart
                                    </Button>
                                </TableCell>
                                <TableCell colSpan={3} align="right">
                                    <Typography variant="h6">
                                        Total: {`$${totalPrice.toLocaleString("en-US", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}`}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default TableCart;
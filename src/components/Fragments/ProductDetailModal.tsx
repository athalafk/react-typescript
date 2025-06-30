import {
Box, Typography, CircularProgress, Grid, Paper, Chip, Modal, IconButton
} from '@mui/material';
import { AppDispatch } from "@/redux/store";
import { useDispatch } from 'react-redux';
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from '@/api/products';
import { addToCart } from "@/redux/features/cartSlice";
import { showNotification } from "@/redux/features/notificationSlice";
import { Product } from "@/types";
import Button from "@/components/Elements/Button";
import CloseIcon from '@mui/icons-material/Close';

interface ProductDetailModalProps {
    productId: number | null;
    onClose: () => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const ProductDetailModal = ({ productId, onClose }: ProductDetailModalProps) => {
    const dispatch: AppDispatch = useDispatch();

    const { data: product, isLoading, isError, error } = useQuery({
        queryKey: ['product', productId],
        queryFn: () => fetchProductById(String(productId!)),
        enabled: !!productId,
    });

    const handleAddToCart = (productToAdd: Product) => {
        dispatch(addToCart(productToAdd));
        dispatch(showNotification({
            message: `Successfully added "${productToAdd.title.substring(0, 20)}..." to cart`,
            type: 'success'
        }));
    };

    return (
        <Modal
            open={!!productId}
            onClose={onClose}
            aria-labelledby="product-detail-modal-title"
            aria-describedby="product-detail-modal-description"
        >
            <Box sx={style}>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                {isLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                        <CircularProgress />
                        <Typography sx={{ ml: 2 }}>Loading...</Typography>
                    </Box>
                )}
                {isError && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                        <Typography color="error">Error: {error.message}</Typography>
                    </Box>
                )}
                {product && (
                     <Paper elevation={0} sx={{ p: 4 }}>
                        <Grid container spacing={4}>
                            <Grid size={{xs:12, md:4}}>
                                <Box
                                    component="img"
                                    src={product.image}
                                    alt={product.title}
                                    sx={{ width: '100%', height: 'auto', maxHeight: 400, objectFit: 'contain' }}
                                />
                            </Grid>
                            <Grid size={{xs:12, md:8}} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Chip label={product.category} color="secondary" sx={{ mb: 2, textTransform: 'capitalize' }} />
                                    <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                                        {product.title}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {product.description}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
                                    <Typography variant="h4" color="primary" fontWeight="bold">
                                        {product.price.toLocaleString("id-ID", { style: "currency", currency: "USD" })}
                                    </Typography>
                                    <Button
                                        size="large"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        Add to Cart
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                )}
            </Box>
        </Modal>
    );
};

export default ProductDetailModal;
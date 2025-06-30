import { useParams, Link as RouterLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addToCart } from "../redux/features/cartSlice";
import { showNotification } from "@/redux/features/notificationSlice";
import { fetchProductById } from '@/api/products';
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";
import { AppDispatch } from "@/redux/store";
import { Box, Typography, CircularProgress, Grid, Paper, Chip, Link } from '@mui/material';
import Button from "@/components/Elements/Button";

const DetailProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch: AppDispatch = useDispatch();

    const { data: product, isLoading, isError, error } = useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProductById(id!),
        enabled: !!id,
    });

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Loading...</Typography>
            </Box>
        );
    }

    if (isError) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <Typography color="error">Error: {error.message}</Typography>
            </Box>
        );
    }

    if (!product) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <Typography>Product not found.</Typography>
            </Box>
        );
    }

    const handleAddToCart = (productToAdd: Product) => {
        dispatch(addToCart(productToAdd));
        dispatch(showNotification({
            message: `Successfully added "${productToAdd.title.substring(0, 20)}..." to cart`,
            type: 'success'
        }));
    };

    return (
        <Box>
            <Link component={RouterLink} to="/products" sx={{ mb: 4, display: 'inline-block' }}>
                &larr; Back to Products
            </Link>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Grid container spacing={4}>
                    <Grid size={{ xs:12, md:4 }} >
                        <Box
                            component="img"
                            src={product.image}
                            alt={product.title}
                            sx={{ width: '100%', height: 'auto', maxHeight: 400, objectFit: 'contain' }}
                        />
                    </Grid>
                    <Grid size={{ xs:12, md:8 }} sx={{ display: 'flex', flexDirection: 'column' }}>
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
        </Box>
    );
};

export default DetailProductPage;
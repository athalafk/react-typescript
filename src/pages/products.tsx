import { useState } from "react";
import { useDispatch } from 'react-redux';
import { addToCart } from "src/redux/features/cartSlice";
import { showNotification } from "src/redux/features/notificationSlice";
import { fetchProducts } from 'src/api/products';
import { useQuery } from '@tanstack/react-query';
import { Product as ProductType } from "src/types";
import { AppDispatch } from "src/redux/store";
import { Box, TextField, Grid, Typography, CircularProgress } from '@mui/material';

import CardProduct from "src/components/Fragments/CardProduct";
import TableCart from "src/components/Fragments/TableCart";
import ProductDetailModal from "src/components/Fragments/ProductDetailModal";

const ProductsPage = () => {
    const [search, setSearch] = useState("");
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const dispatch: AppDispatch = useDispatch();

    const { data: allProducts = [], isLoading, isError, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
        staleTime: 1000,
    });

    const filteredProducts = allProducts.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddToCart = (product: ProductType) => {
        dispatch(addToCart(product));
        dispatch(showNotification({
            message: `Successfully added "${product.title.substring(0, 20)}..." to cart`,
            type: 'success'
        }));
    };

    const handleOpenModal = (productId: number) => {
        setSelectedProductId(productId);
    };

    const handleCloseModal = () => {
        setSelectedProductId(null);
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <TextField
                    id="search"
                    name="search"
                    label="Search product..."
                    variant="outlined"
                    sx={{ width: '50%' }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Box>

            <Box sx={{ display: 'flex' }}>
                <Box sx={{ flexGrow: 1 }}>
                    {isLoading && (
                      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                          <CircularProgress />
                          <Typography sx={{ml: 2}}>Loading products...</Typography>
                      </Box>
                    )}
                    {isError && <Typography color="error">Error: {error.message}</Typography>}
                    <Grid container spacing={2}>
                        {!isLoading && !isError && filteredProducts.map((product) => (
                            <Grid key={product.id} size={{xs:12, sm:6, md:4, lg:3, xl:3}}>
                                <CardProduct handleOpenModal={() => handleOpenModal(product.id)}>
                                    <CardProduct.Header image={product.image}/>
                                    <CardProduct.Body title={product.title}>
                                        {product.description}
                                    </CardProduct.Body>
                                    <CardProduct.Footer
                                        price={product.price}
                                        handleAddToCart={() => handleAddToCart(product)}
                                    />
                                </CardProduct>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <TableCart />
            </Box>
            <ProductDetailModal productId={selectedProductId} onClose={handleCloseModal} />
        </>
    );
};

export default ProductsPage;
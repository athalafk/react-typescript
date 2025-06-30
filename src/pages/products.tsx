import { useState } from "react";
import { useDispatch } from 'react-redux';
// import { addToCart } from "@/redux/features/cartSlice";
import { useCartStore } from "@/zustand/cartStore";
import { showNotification } from "@/redux/features/notificationSlice";
import { fetchProducts } from '@/api/products';
import { useQuery } from '@tanstack/react-query';
import { Product as ProductType } from "@/types";
import { AppDispatch } from "@/redux/store";
import { Box, TextField, Grid, Typography, CircularProgress } from '@mui/material';

import CardProduct from "@/components/Fragments/CardProduct";
import TableCart from "@/components/Fragments/TableCart";

const ProductsPage = () => {
    const [search, setSearch] = useState("");
    const dispatch: AppDispatch = useDispatch();
    const { addToCart } = useCartStore();

    const { data: allProducts = [], isLoading, isError, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });

    const filteredProducts = allProducts.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddToCart = (product: ProductType) => {
        addToCart(product);
        dispatch(showNotification({
            message: `Successfully added "${product.title.substring(0, 20)}..." to cart`,
            type: 'success'
        }));
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
                                <CardProduct>
                                    <CardProduct.Header image={product.image} id={product.id}/>
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
        </>
    );
};

export default ProductsPage;
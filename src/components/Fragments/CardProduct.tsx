import { memo, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, CardActions, Typography, Button as MuiButton } from '@mui/material';

interface CardProductProps {
    children: ReactNode;
}

interface HeaderProps {
    image: string;
    id: number;
}

interface BodyProps {
    title: string;
    children: ReactNode;
}

interface FooterProps {
    price: number;
    handleAddToCart: () => void;
}

const CardProduct = ({ children }: CardProductProps) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {children}
    </Card>
);

const Header = memo(({ image, id }: HeaderProps) => (
    <Link to={`/product/${id}`}>
        <CardMedia
            component="img"
            sx={{ height: 200, objectFit: 'contain', p: 2 }}
            image={image}
            alt="product"
        />
    </Link>
));

const Body = memo(({ title, children }: BodyProps) => (
    <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '2',
            WebkitBoxOrient: 'vertical',
        }}>
            {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '3',
            WebkitBoxOrient: 'vertical',
        }}>
            {children}
        </Typography>
    </CardContent>
));

const Footer = memo(({ price, handleAddToCart }: FooterProps) => (
    <CardActions sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <Typography variant="h6" color="primary">
            {price.toLocaleString('id-ID', { style: 'currency', currency: 'USD' })}
        </Typography>
        <MuiButton size="small" variant="contained" onClick={handleAddToCart}>
            Add to Cart
        </MuiButton>
    </CardActions>
));

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;
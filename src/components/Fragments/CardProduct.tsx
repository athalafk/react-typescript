import { memo, ReactNode } from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography } from '@mui/material';
import Button from '@/components/Elements/Button';

interface CardProductProps {
    children: ReactNode;
    handleOpenModal: () => void;
}

interface HeaderProps {
    image: string;
}

interface BodyProps {
    title: string;
    children: ReactNode;
}

interface FooterProps {
    price: number;
    handleAddToCart: () => void;
}

const CardProduct = ({ children, handleOpenModal }: CardProductProps) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }} onClick={handleOpenModal}>
        {children}
    </Card>
);

const Header = memo(({ image }: HeaderProps) => (
    console.log('Render Header'),
    <CardMedia
        component="img"
        sx={{ height: 200, objectFit: 'contain', p: 2 }}
        image={image}
        alt="product"
    />
));

const Body = memo(({ title, children }: BodyProps) => (
    console.log('Render Body'),
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

const areEqual = (prevProps: Readonly<FooterProps>, nextProps: Readonly<FooterProps>) => {
    return prevProps.price === nextProps.price;
}

const Footer = memo(({ price, handleAddToCart }: FooterProps) => (
    console.log('Render Footer'),
    <CardActions sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <Typography variant="h6" color="primary">
            {price.toLocaleString('id-ID', { style: 'currency', currency: 'USD' })}
        </Typography>
        <Button size="small" onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
        }}>
            Add to Cart
        </Button>
    </CardActions>
), areEqual);


CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;
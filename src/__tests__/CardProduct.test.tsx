import { render, screen, fireEvent } from '@testing-library/react';
import CardProduct from 'src/components/Fragments/CardProduct';
import { describe, it, expect, vi } from 'vitest';

// Data tiruan untuk digunakan dalam tes
const mockProduct = {
  image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  title: 'Sample Product Title',
  description: 'This is a sample product description that is long enough to be truncated.',
  price: 109.95,
};

describe('CardProduct Component', () => {

  // Test 1: Memastikan semua bagian kartu (Header, Body, Footer) me-render data dengan benar.
  it('should render the product image, title, description, and price correctly', () => {
    const handleOpenModal = vi.fn();
    const handleAddToCart = vi.fn();

    render(
      <CardProduct handleOpenModal={handleOpenModal}>
        <CardProduct.Header image={mockProduct.image} />
        <CardProduct.Body title={mockProduct.title}>
          {mockProduct.description}
        </CardProduct.Body>
        <CardProduct.Footer price={mockProduct.price} handleAddToCart={handleAddToCart} />
      </CardProduct>
    );

    // Cek Header: Pastikan gambar dirender
    const imageElement = screen.getByRole('img', { name: /product/i });
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', mockProduct.image);

    // Cek Body: Pastikan judul dan deskripsi dirender
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();

    // Cek Footer: Pastikan harga dirender dengan format yang benar
    const formattedPrice = mockProduct.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    expect(screen.getByText(formattedPrice)).toBeInTheDocument();
    
    // Cek Footer: Pastikan tombol "Add to Cart" ada
    expect(screen.getByRole('button', { name: /Add to Cart/i })).toBeInTheDocument();
  });

  // Test 2: Memastikan fungsi handleOpenModal dipanggil saat area kartu utama diklik.
  it('should call handleOpenModal when the card is clicked', () => {
    const handleOpenModal = vi.fn();
    const handleAddToCart = vi.fn();

    render(
      <CardProduct handleOpenModal={handleOpenModal}>
        <CardProduct.Footer price={100} handleAddToCart={handleAddToCart} />
      </CardProduct>
    );

    // Cari elemen kartu berdasarkan event handler onClick yang ada padanya.
    const cardElement = screen.getByRole('button', { name: /Add to Cart/i }).closest('div.MuiCard-root');
    
    if (cardElement) {
        fireEvent.click(cardElement);
    }
    
    expect(handleOpenModal).toHaveBeenCalledTimes(1);
  });

  // Test 3:
  // Memastikan bahwa mengklik tombol "Add to Cart" HANYA memanggil handleAddToCart
  it('should call handleAddToCart and not handleOpenModal when "Add to Cart" button is clicked', () => {
    const handleOpenModal = vi.fn();
    const handleAddToCart = vi.fn();

    render(
      <CardProduct handleOpenModal={handleOpenModal}>
        <CardProduct.Footer price={mockProduct.price} handleAddToCart={handleAddToCart} />
      </CardProduct>
    );

    const addToCartButton = screen.getByRole('button', { name: /Add to Cart/i });
    fireEvent.click(addToCartButton);

    // Pastikan fungsi untuk menambahkan ke keranjang DIPANGGIL
    expect(handleAddToCart).toHaveBeenCalledTimes(1);

    // Pastikan fungsi untuk membuka modal TIDAK DIPANGGIL
    expect(handleOpenModal).not.toHaveBeenCalled();
  });
});
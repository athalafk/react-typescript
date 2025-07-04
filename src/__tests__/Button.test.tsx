import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/Elements/Button/index'; 
import { describe, it, expect, vi } from 'vitest';

describe('Button Component', () => {
  // Test 1: Memastikan tombol me-render teks di dalamnya dengan benar
  it('should render children when not loading', () => {
    render(<Button>Login</Button>);
    // Memastikan tombol ada di dalam dokumen
    const buttonElement = screen.getByRole('button', { name: /Login/i });
    expect(buttonElement).toBeInTheDocument();
  });

  // Test 2: Memastikan tombol dapat diklik dan menjalankan fungsi yang diberikan
  it('should call onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const buttonElement = screen.getByRole('button', { name: /Click Me/i });
    fireEvent.click(buttonElement);

    // Memastikan fungsi `handleClick` dipanggil
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // Test 3: Memastikan tombol dalam keadaan 'disabled' jika prop 'disabled' bernilai true
  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);

    const buttonElement = screen.getByRole('button', { name: /Disabled/i });
    expect(buttonElement).toBeDisabled();
  });

  // Test 4: Memastikan CircularProgress (indikator loading) muncul saat isLoading
  it('should show CircularProgress and be disabled when isLoading is true', () => {
    render(<Button isLoading>Loading...</Button>);

    const buttonElement = screen.getByRole('button');
    
    // Memastikan tombol dalam keadaan disabled
    expect(buttonElement).toBeDisabled();

    // Memastikan teks "Loading..." tidak muncul, karena seharusnya diganti oleh CircularProgress
    const buttonText = screen.queryByText(/Loading.../i);
    expect(buttonText).not.toBeInTheDocument();

    // Memastikan elemen CircularProgress ada di dalam tombol
    const progressIndicator = screen.getByRole('progressbar');
    expect(progressIndicator).toBeInTheDocument();
  });

  // Test 5: Memastikan tombol tetap disabled saat loading meskipun prop 'disabled' bernilai false
   it('should be disabled when isLoading is true, even if disabled prop is false', () => {
    render(<Button isLoading disabled={false}>Submitting</Button>);
    
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
  });
});
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest'; 
import FormLogin from 'src/components/Fragments/FormLogin'; 
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

describe('FormLogin Component', () => {
  
  it('should render the login form with all fields and a button', () => {
    
    // 'render' komponen FormLogin di dalam lingkungan tes JSDOM
    render(
      <Router>
        <QueryClientProvider client={queryClient}>
          <FormLogin />
        </QueryClientProvider>
      </Router>
    );

    // 'screen.getByLabelText' untuk mencari input berdasarkan labelnya
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    
    // 'screen.getByRole' untuk mencari tombol berdasarkan perannya
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});
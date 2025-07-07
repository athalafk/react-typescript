import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from 'src/redux/store'
import { HelmetProvider } from '@dr.pogodin/react-helmet'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

import MainLayout from 'src/components/Layouts/MainLayouts'
import 'src/index.css'

const LoginPage = lazy(() => import('src/pages/login'));
const RegisterPage = lazy(() => import('src/pages/register'));
const ProductsPage = lazy(() => import('src/pages/products'));
// const DetailProductPage = lazy(() => import('src/pages/detailProduct'));
const ErrorPage = lazy(() => import('src/pages/404'));

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },  
})

const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/404', element: <ErrorPage /> },
  {
    element: <MainLayout />,
    children: [
      { path: '/products', element: <ProductsPage /> },
      // { path: '/product/:id', element: <DetailProductPage /> },
      { path: '/', element: <Navigate to="/products" replace /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <HelmetProvider>
            <Suspense fallback={<div style = {{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:'100dvh' }}>Loading...</div>}>
              <RouterProvider router={router} />
            </Suspense>
          </HelmetProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)

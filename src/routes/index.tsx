import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import MainLayout from '@components/layouts/MainLayout'
import HomePage from '@features/home/HomePage'
import SolutionsPage from '@features/solutions/SolutionsPage'
import ProductsPage from '@features/products/ProductsPage'
import ServicesPage from '@features/services/ServicesPage'
import NewsPage from '@features/news/NewsPage'
import AboutPage from '@features/about/AboutPage'
import LoginPage from '@features/auth/LoginPage'
import RegisterPage from '@features/auth/RegisterPage'
import VerifyCodePage from '@features/auth/VerifyCodePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'solutions', element: <SolutionsPage /> },
      { path: 'products', element: <ProductsPage /> },
      // { path: 'services', element: <ServicesPage  /> },
      // { path: 'news', element: <NewsPage /> },
      // { path: 'about-us', element: <AboutPage /> }
      // Redirect unfinished pages back to Home
      { path: 'services', element: <Navigate to='/' replace /> },
      { path: 'news', element: <Navigate to='/' replace /> },
      { path: 'about-us', element: <Navigate to='/' replace /> }
    ]
  },
  // Auth Routes
  {
    path: '/dang-nhap',
    element: <LoginPage />
  },
  {
    path: '/dang-ky-demo',
    element: <RegisterPage />
  },
  {
    path: '/xac-thuc-ma',
    element: <VerifyCodePage />
  }
])

const AppRoutes = () => <RouterProvider router={router} />

export default AppRoutes

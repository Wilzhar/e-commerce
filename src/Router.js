import { Outlet, createBrowserRouter } from "react-router-dom";

// components
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Dashboard from './pages/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoutes';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Footer from './components/Footer/Footer';

const futureConfig = {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true
  },
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <div className='2xl:w-[1536px] 2xl:mx-auto 2xl:my-0 min-h-[400px]'>
          <Outlet />
        </div>
        <Footer />
      </>
    ),
    errorElement: <div>Error</div>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Auth><Login /></Auth>,
      },
      {
        path: '/signup',
        element: <Auth><SignUp /></Auth>,
      },
      {
        path: '/dashboard',
        element: <PrivateRoute element={<Dashboard />} />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ]
  },
], futureConfig);

export default router;

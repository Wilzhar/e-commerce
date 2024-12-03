import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './components/PrivateRoutes';
import { Outlet, createBrowserRouter } from "react-router-dom";

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
        <div>Header</div>
        <Outlet />
        <div>Footer</div>
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
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/dashboard',
        element: <PrivateRoute element={<Dashboard />} />,
      },
    ]
  },
], futureConfig);

export default router;

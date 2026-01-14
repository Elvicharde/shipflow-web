import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import Shipments from '../pages/Shipments';
import Analytics from '../pages/Analytics';
import AuthLayout from '@/components/layout/AuthLayout';
import { LoginPage, RegisterPage } from '../pages/Auth';
import { Layout } from '@/components/layout/Layout';
import Dashboard from '../pages/Dashboard/Dashboard';
import WizardLayout from '../pages/BulkShipments/BulkWizard/WizardLayout';
import SuccessPage from '../pages/BulkShipments/BulkWizard/SuccessPage';
import BulkList from '../pages/BulkShipments/BulkList';
import BulkUpload from '../pages/BulkShipments/BulkUpload';
import ShipmentDetails from '../pages/ShipmentDetails/ShipmentDetails';
import Settings from '../pages/Settings/Settings';
import ProtectedRoute from './ProtectedRoute';

function Routes() {
  const router = createBrowserRouter([
    { path: '/', element: <Home /> }, // Home is public
    {
      path: '/login',
      element: (
        <AuthLayout>
          <LoginPage />
        </AuthLayout>
      ),
    }, // Login page
    {
      path: '/register',
      element: (
        <AuthLayout>
          <RegisterPage />
        </AuthLayout>
      ),
    }, // Register page
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <Layout />,
          children: [
            {
              path: '/dashboard',
              element: <Dashboard />,
            },
            { path: '/dashboard/upload', element: <WizardLayout /> },
            { path: '/shipments', element: <Shipments /> },
            { path: '/analytics', element: <Analytics /> },
            {
              path: 'bulkshipments/bulkwizard/success',
              element: <SuccessPage />,
            },
            { path: 'bulk', element: <BulkList /> },
            { path: 'bulk/upload', element: <BulkUpload /> },
            { path: 'shipments/:id', element: <ShipmentDetails /> },
            { path: 'settings', element: <Settings /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Routes;

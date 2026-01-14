import SuccessPage from '../pages/BulkShipments/BulkWizard/SuccessPage';
import { LoginPage, RegisterPage } from '../pages/Auth';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';

import Dashboard from '../pages/Dashboard/Dashboard';
import BulkList from '../pages/BulkShipments/BulkList';
import BulkUpload from '../pages/BulkShipments/BulkUpload';
import ShipmentDetails from '../pages/ShipmentDetails/ShipmentDetails';
import Settings from '../pages/Settings/Settings';
import { Layout } from '@/components/layout/Layout';
import WizardLayout from '../pages/BulkShipments/BulkWizard/WizardLayout';
import ProtectedRoute from './ProtectedRoute';

function Routes() {
  const router = createBrowserRouter([
    { path: '/login', element: <LoginPage /> },
    { path: '/register', element: <RegisterPage /> },
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        { path: '', element: <Dashboard /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'dashboard/upload', element: <WizardLayout /> },
        { path: 'bulkshipments/bulkwizard/success', element: <SuccessPage /> },
        // { path: "bulk", element: <BulkList /> },
        // { path: "bulk/upload", element: <BulkUpload /> },
        // { path: "shipments/:id", element: <ShipmentDetails /> },
        // { path: "settings", element: <Settings /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Routes;

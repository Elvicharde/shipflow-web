import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '../pages/Home';
import { LoginPage } from '../pages/Auth';
import { Layout } from '@/components/layout/Layout';
import Dashboard from '../pages/Dashboard/Dashboard';
import WizardLayout from '../pages/BulkShipments/BulkWizard/WizardLayout';
import SuccessPage from '../pages/BulkShipments/BulkWizard/SuccessPage';
import BulkList from '../pages/BulkShipments/BulkList';
import BulkUpload from '../pages/BulkShipments/BulkUpload';
import ShipmentDetails from '../pages/ShipmentDetails/ShipmentDetails';
import Settings from '../pages/Settings/Settings';

function Routes() {
  const router = createBrowserRouter([
    { path: '/', element: <Home /> }, // Home is public
    { path: '/login', element: <LoginPage /> }, // Login page
    {
      path: '/',
      element: <Layout />, // Dashboard and protected views use Layout
      children: [
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'dashboard/upload', element: <WizardLayout /> },
        { path: 'bulkshipments/bulkwizard/success', element: <SuccessPage /> },
        { path: 'bulk', element: <BulkList /> },
        { path: 'bulk/upload', element: <BulkUpload /> },
        { path: 'shipments/:id', element: <ShipmentDetails /> },
        { path: 'settings', element: <Settings /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Routes;

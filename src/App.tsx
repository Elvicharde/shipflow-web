import React from 'react';
import Routes from './routes';
import './index.css';
import { Toaster } from 'sonner';

const App: React.FC = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Routes />;
    </>
  );
};

export default App;

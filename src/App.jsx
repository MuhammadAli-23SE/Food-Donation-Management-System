import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { AppRoutes } from './routes/AppRoutes';
import { Toast } from './components/common/Toast';
import { DemoRoleSwitcher } from './components/common/DemoRoleSwitcher';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Toast />
          <AppRoutes />
          <DemoRoleSwitcher />
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;

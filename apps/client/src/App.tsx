import React from 'react';
import { AuthProvider } from './app/providers';
import { AppRouter } from './app/router';

export function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App;

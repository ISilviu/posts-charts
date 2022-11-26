import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import App from './components/App';
import queryClient from './api/queryClient';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={queryClient}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Rotas } from './routes/rotas';
import { AuthProvider } from './hooks/auth';
import { LoadingProvider } from './hooks/loadingprovider';
import { CarrinhoProvider } from './hooks/carrinho';

ReactDOM.render(
  <React.StrictMode>
    <CarrinhoProvider>
      <LoadingProvider>
        <AuthProvider>
          <Rotas />
        </AuthProvider>
      </LoadingProvider>
    </CarrinhoProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
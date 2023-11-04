import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
//shared layout
import SharedLayout from './components/SharedLayout.tsx';
//pages
import NotFoundPage from './Pages/NotFoundPage.tsx';
import LoginPage from './Pages/LoginPage.tsx';
import RegisterPage from './Pages/RegisterPage.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<div>About</div>} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/contact" element={<SharedLayout />}></Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

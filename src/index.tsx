import React from 'react';
import ReactDOM from 'react-dom/client';
import MainPage from './pages/MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SelectionPageNew from './pages/SelectionPageNew';
import { UserProvider } from './elements/UserProvider';
import OverviewPage from './pages/OverviewPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
console.log("APP RENDERED");

root.render(
  <React.StrictMode>
    <UserProvider>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<SelectionPageNew />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="main/overview" element={<OverviewPage />} />
    </Routes>
    </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);


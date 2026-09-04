
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AccountsPage } from './pages/AccountsPage';
import { CategoriesPage } from "./pages/CategoriesPage";
import { AccountsFormPage } from './pages/AccountsFormPage';
import { DashboardPage } from './pages/DashboardPage';
import { Layout } from './components/Layout';
import { Toaster } from 'react-hot-toast';

function app() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/accounts" element={<AccountsPage />} />
                    <Route path="/categories" element={<CategoriesPage />} />
                    <Route path="/accounts/:id" element={<AccountsFormPage />} />
                </Route>
            </Routes>
            <Toaster />
        </BrowserRouter>
  );
}

export default app;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import InvoicesPage from './InvoicesPage';

// Admin route entry point
export default function AdminPanel() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<InvoicesPage />} />
          <Route path="invoices" element={<InvoicesPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

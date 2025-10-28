import React, { useEffect, useState } from 'react';
import InvoiceRow from './InvoiceRow';
import InvoiceDetailsModal from './InvoiceDetailsModal';
import { supabase } from '../lib/supabaseAdmin';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ search: '', status: '' });
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  async function fetchInvoices() {
    setLoading(true);
    const { data, error } = await supabase
      .from('invoices')
      .select('id, user_id, email, amount, currency, status, montonio_payment_id, pdf_path, sent, created_at')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching invoices:', error);
    } else {
      setInvoices(data || []);
    }
    setLoading(false);
  }

  async function resendInvoice(invoiceId) {
    // Call Supabase Edge Function for resend
    const { data, error } = await supabase.functions.invoke('generate-invoice', {
      body: { invoice_id: invoiceId, resend: true }
    });

    if (error) {
      alert('Failed to resend: ' + error.message);
    } else {
      alert('Resent successfully');
    }
  }

  async function markAsSent(invoiceId) {
    const { error } = await supabase
      .from('invoices')
      .update({ sent: true })
      .eq('id', invoiceId);

    if (error) {
      alert('Failed to update: ' + error.message);
    } else {
      fetchInvoices(); // Refresh list
    }
  }

  const filteredInvoices = invoices.filter(invoice => {
    if (filter.search && !invoice.email.toLowerCase().includes(filter.search.toLowerCase())) return false;
    if (filter.status === 'sent' && !invoice.sent) return false;
    if (filter.status === 'pending' && invoice.sent) return false;
    return true;
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Invoices</h2>
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by email..."
          className="border px-3 py-1"
          value={filter.search}
          onChange={(e) => setFilter({...filter, search: e.target.value})}
        />
        <select
          className="border px-3 py-1"
          value={filter.status}
          onChange={(e) => setFilter({...filter, status: e.target.value})}
        >
          <option value="">All Status</option>
          <option value="sent">Sent</option>
          <option value="pending">Pending</option>
        </select>
      </div>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Created</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.map(invoice => (
            <InvoiceRow
              key={invoice.id}
              invoice={invoice}
              onResend={resendInvoice}
              onMarkSent={markAsSent}
              onView={setSelectedInvoice}
            />
          ))}
        </tbody>
      </table>
      <InvoiceDetailsModal
        invoice={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
      />
    </div>
  );
}

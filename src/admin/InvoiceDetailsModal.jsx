import React from 'react';

export default function InvoiceDetailsModal({ invoice, onClose }) {
  if (!invoice) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-xl font-bold mb-4">Invoice Details</h3>
        <p><strong>ID:</strong> {invoice.id}</p>
        <p><strong>Email:</strong> {invoice.email}</p>
        <p><strong>Amount:</strong> {invoice.amount} {invoice.currency}</p>
        <p><strong>Status:</strong> {invoice.sent ? 'Sent' : 'Pending'}</p>
        <p><strong>Payment:</strong> {invoice.montonio_payment_id}</p>
        <p><strong>Created:</strong> {new Date(invoice.created_at).toLocaleString()}</p>
        {invoice.pdf_path && (
          <p><strong>PDF:</strong> <a href={invoice.pdf_path} target="_blank" rel="noopener noreferrer" className="text-blue-500">View PDF</a></p>
        )}
        <div className="mt-4 flex justify-end">
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';

export default function InvoiceRow({ invoice, onResend, onMarkSent, onView }) {
  return (
    <tr className="border-t">
      <td className="px-4 py-2">{invoice.id.slice(0, 8)}...</td>
      <td className="px-4 py-2">{invoice.email}</td>
      <td className="px-4 py-2">{invoice.amount} {invoice.currency}</td>
      <td className="px-4 py-2">
        <span className={`px-2 py-1 rounded ${invoice.sent ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
          {invoice.sent ? 'Sent' : 'Pending'}
        </span>
      </td>
      <td className="px-4 py-2">{new Date(invoice.created_at).toLocaleDateString()}</td>
      <td className="px-4 py-2 flex gap-2">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => onView(invoice)}
        >
          View
        </button>
        {!invoice.sent && (
          <button
            className="bg-yellow-500 text-white px-3 py-1 rounded"
            onClick={() => onMarkSent(invoice.id)}
          >
            Mark Sent
          </button>
        )}
        <button
          className="bg-green-500 text-white px-3 py-1 rounded"
          onClick={() => onResend(invoice.id)}
        >
          Resend
        </button>
      </td>
    </tr>
  );
}

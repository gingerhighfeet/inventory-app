import React from 'react';

const InvoiceList = ({ invoices }) => {
  return (
    <div>
      {invoices.map((invoice) => (
        <div key={invoice.invoic} className="invoice-card">
          <p>Invoice Date: {new Date(invoice.invoiceDate).toLocaleDateString()}</p>
          <p>Invoice Number: {invoice.invoiceNumber}</p>
          <p>Vendor: {invoice.vendor}</p>
          <p className="product-list">
            Products: {invoice.products.map((product) => product.name).join(', ')}
          </p>
        </div>
      ))}
    </div>
  )};

export default InvoiceList;

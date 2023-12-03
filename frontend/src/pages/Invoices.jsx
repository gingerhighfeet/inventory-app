import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getInvoices } from '../features/invoice/invoiceSlice';
import InvoiceList from '../components/InvoiceList';

function Invoices() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { invoiceList } = useSelector((state) => state.invoice); // Fix this line

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(getInvoices());
    }
  }, [user, navigate, dispatch]);

  return (
    <div>
      <h2>Invoices</h2>
      {invoiceList && invoiceList.length > 0 ? (
        <InvoiceList invoices={invoiceList} />
      ) : (
        <p>No invoices available.</p>
      )}
    </div>
  );
}

export default Invoices;

import React, { forwardRef } from 'react';

const InvoicePreview = forwardRef(({ customer = {}, saleItems = [], products = [], invoiceNo = '', totalAmount = 0 }, ref) => {
  // Calculate total with discount applied
  const total = saleItems.reduce((sum, item) => {
    const product = products.find(p => p._id === item.product);
    if (!product) return sum;

   const price = product.price || 0;
    const discount = item.discount || 0;
    const discountedPrice = price - (price * discount) / 100;
    return sum + discountedPrice * item.quantity;
  }, 0);

     

  const currentDate = new Date().toLocaleDateString();

  return (
    <div
      ref={ref}
      className="invoice-print border p-4 bg-white d-flex flex-column"
      style={{ width: '100%', fontFamily: 'Arial', color: '#000', minHeight: '850px' }}
    >
      {/* Company Header */}
      <div className="text-center mb-4">
       
        <h3 className="mt-2"> Alankrut Jewel Hub </h3>
        <p> Address: Shop No.4, Arthav CHS, Plot No.C-5, Sector 20, Gavdevi Chowk, Near NR Bhagat School, Nerul , Navi Mumbai.  </p>
        <p> Contact: 9920445447/ 7066670766 </p>
        <hr />
      </div>

      {/* Invoice Details */}
      <div className="d-flex justify-content-between mb-3">
        <div>
          <strong> Customer:</strong> {customer.name || '-'}<br />
          <strong> Contact:</strong> {customer.contact || '-'}
        </div>
        <div>
          <strong>Date:</strong> {currentDate}<br />
          <strong>Invoice No:</strong> {invoiceNo || '-'}
        </div>
      </div>

      {/* Product Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Discount </th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {saleItems.map(item => {
            const product = products.find(p => p._id === item.product);
            if (!product) return null;

           const price = product.price || 0;
            const discount = item.discount || 0;
            const discountedPrice = price - (price * discount) / 100;
            const totalPrice = discountedPrice * item.quantity;



            return (
              <tr key={item.product}>
                <td>{product.name}</td>
                <td>{item.quantity}</td>
                <td>₹{price.toFixed(2)}</td>
                <td> ₹ {discount} </td>
                <td>₹{totalPrice.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Spacer */}
      <div style={{ flexGrow: 1 }} />

      {/* Total */}
      <div className="text-end mt-3">
        <h5><strong>Total Amount: ₹{total.toFixed(2)}</strong></h5>
      </div>

      <p className="text-center mt-3">Thank you for shopping with us!</p>
    </div>
  );
});

export default InvoicePreview;

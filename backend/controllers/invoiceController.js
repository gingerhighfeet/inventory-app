const asyncHandler = require('express-async-handler')

const Invoice = require('../models/invoiceModel')

//@desc Get invoices 
//@route GET /api/invoices
//@access Private
const getInvoices = asyncHandler(async (req, res) => {
    try {
        const invoices = await Invoice.find({}, { _id: 0, __v: 0 });

        const formattedInvoices = invoices.map(item => ({
            invoiceDate: item.invoiceDate,
            invoiceNumber: item.invoiceNumber,
            vendor: item.vendor
        }));

        res.status(200).json(formattedInvoices);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// @desc    Create invoice
// @route   POST /api/invoices
// @access  Private
const createInvoice = asyncHandler(async (req, res) => {
    const { invoiceNumber, invoiceDate, vendor, products } = req.body;
    
  if (!invoiceNumber || !invoiceDate || !vendor || !products ) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  
   const invoices = await Invoice.create({
        invoiceNumber,
        invoiceDate,
        vendor,
        products,
    });
  
   res.status(200).json(invoices);
  });


module.exports = {
    getInvoices,
    createInvoice,
} 
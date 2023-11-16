const asyncHandler = require('express-async-handler')

const Invoices = require('../models/invoiceModel')

//@desc Get invoices 
//@route GET /api/invoices
//@access Private
const getInvoices = asyncHandler(async (req, res) => {
    try {
        const invoices = await Invoices.find({}, { _id: 0, __v: 0 }); // Exclude _id and __v fields from the response

        const formattedInvoices = invoices.map(item => ({
            invoiceDate: item.invoiceDate,
            invoiceNumber: item.invoiceNumber,
            vendor: item.vendor
        }));

        res.status(200).json(formattedInvoices);
    } catch (error) {
        // Handle error, for example, send an error response
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// @desc    Create invoice
// @route   POST /api/invoices
// @access  Private
const createInvoice = asyncHandler(async (req, res) => {
    const { invoiceNumber, invoiceDate, vendor } = req.body;
    
  if (!invoiceNumber || !invoiceDate || !vendor ) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  
   const invoices = await Invoices.create({
        invoiceNumber,
        invoiceDate,
        vendor,
    });
  
   res.status(200).json(invoices);
  });


module.exports = {
    getInvoices,
    createInvoice,
} 
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell the product name!'],
    trim: true,
    maxlength: [20, 'must be less than or equal to 20'],
    minlength: [3, 'must be greater than 3'],
  },
  quantity: {
    type: Number,
    required: [true, 'Please provide the quantity']
  },
  price: {
    type: Number,
    required: [true, 'Please provide the price']
  },
  brand: {
    type: String,
    trim: true,
    required: [true, 'Please provide the brand']
  },
  created: {
    type: Date,
    default: new Date(),
    required: false
  }
});


const Product = mongoose.model('Product', productSchema);

export default Product